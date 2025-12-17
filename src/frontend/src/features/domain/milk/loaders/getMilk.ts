import type { LoaderFunctionArgs } from "react-router";

import { milkClient } from "../services/client";

import { getErrorStatusText } from "../../../../shared/helpers/getErrorStatusText/getErrorStatusText";
import { tTyped } from "../../../../configs/i18n";

export const getMilk = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { id } = params;
		if (!id) return null;

		const milkResponse = await milkClient.getMilk({ params: { id } });

		return milkResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Could not load milk");
	}
};
