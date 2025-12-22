import { tTyped } from "@/configs/i18n";

import type { LoaderFunctionArgs } from "react-router";
import type { Storage } from "../types";

import { storageClient } from "../services/storageClient";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const getStorage = async ({ params }: LoaderFunctionArgs): Promise<Storage | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const storageResponse = await storageClient.getStorage({ params: { uuid: id } });

		return storageResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}

		throw new Error("Failed to load storages");
	}
};
