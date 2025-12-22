import { tTyped } from "@/configs/i18n";
import type { LoaderFunctionArgs } from "react-router";

import { pasteurClient } from "../services/pasteurClient";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const getPasteur = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const pasteurResponse = await pasteurClient.getPasteur({ params: { id } });
		return pasteurResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Could not get pasteur");
	}
};
