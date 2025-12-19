import { tTyped } from "@/configs/i18n";

import type { LoaderFunctionArgs } from "react-router";
import type { ProductDefinition } from "../types";

import { productDefinitionClient } from "../services/client";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const getProductDefinition = async ({
	params,
}: LoaderFunctionArgs): Promise<ProductDefinition | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const productDefinitionResponse = await productDefinitionClient.getProductDefinition({
			params: { uuid: id },
		});

		return productDefinitionResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Failed to load product definition.");
	}
};
