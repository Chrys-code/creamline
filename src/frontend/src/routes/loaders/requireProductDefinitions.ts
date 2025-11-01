import z from "zod";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requireProductDefinitions = async () => {
	try {
		const ProductDefinitionListSchema = z.array(schemas.ProductDefinitionSchema);
		const productDefinitionResponse = await api.get("/api/v1/product-definition/");
		const parsed = ProductDefinitionListSchema.parse(productDefinitionResponse);
		return parsed;
	} catch {
		throw new Error();
	}
};

export default requireProductDefinitions;
