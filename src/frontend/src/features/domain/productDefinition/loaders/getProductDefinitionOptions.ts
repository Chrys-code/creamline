import { productDefinitionClient } from "../services/client";

export const getProductDefinitionOptions = async () => {
	try {
		const productDefinitionOptionsResponse =
			await productDefinitionClient.v1_product_definition_types_retrieve();

		return productDefinitionOptionsResponse;
	} catch {
		throw new Error("Failed to load product definition options.");
	}
};
