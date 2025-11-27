import type { LoaderFunctionArgs } from "react-router";
import type { ProductDefinition } from "../types";
import { productDefinitionClient } from "../services/client";

export const getProductDefinition = async ({
	params,
}: LoaderFunctionArgs): Promise<ProductDefinition | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const productDefinitionResponse =
			await productDefinitionClient.v1_product_definition_retrieve({
				params: { uuid: id },
			});

		return productDefinitionResponse;
	} catch {
		throw new Error("Failed to load product definition.");
	}
};
