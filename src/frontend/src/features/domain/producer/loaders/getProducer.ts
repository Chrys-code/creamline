import { tTyped } from "@/configs/i18n";

import type { LoaderFunctionArgs } from "react-router";
import type { Producer } from "../types";

import { producerClient } from "../services/client";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const getProducer = async ({ params }: LoaderFunctionArgs): Promise<Producer | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const userResponse = await producerClient.getProducer({ params: { uuid: id } });

		return userResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Failed to load producer");
	}
};
