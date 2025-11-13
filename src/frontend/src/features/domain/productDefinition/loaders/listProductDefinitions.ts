import { productDefinitionClient } from "../services/client";

export const listProductDefinitions = async () => {
	try {
		const productDefinitionResponse =
			await productDefinitionClient.v1_product_definition_list();

		return productDefinitionResponse;
	} catch {
		throw new Error("Could not get product definitions");
	}
};
