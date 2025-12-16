import { productDefinitionClient } from "../services/client";

export const getProductDefinitionOptions = async () => {
	try {
		const productDefinitionOptionsResponse =
			await productDefinitionClient.getProductDefinitionTypes();

		return productDefinitionOptionsResponse;
	} catch {
		throw new Error("Failed to load product definition options.");
	}
};
