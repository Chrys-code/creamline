import { productDefinitionClient } from "../services/client";

import { getErrorStatusText } from "../../../../shared/helpers/getErrorStatusText/getErrorStatusText";
import { tTyped } from "../../../../configs/i18n";

export const getProductDefinitionOptions = async () => {
	try {
		const productDefinitionOptionsResponse =
			await productDefinitionClient.getProductDefinitionTypes();

		return productDefinitionOptionsResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Failed to load product definition options.");
	}
};
