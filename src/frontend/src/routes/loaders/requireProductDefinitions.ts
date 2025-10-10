import type { ProductDefinition } from "../../api/types";

import { api } from "../../api/axios";

const requireProductDefinitions = async (): Promise<ProductDefinition[]> => {
	try {
		const productDefinitionResponse = await api.get("/api/v1/product-definition/");
		return productDefinitionResponse;
	} catch {
		throw new Error();
	}
};

export default requireProductDefinitions;
