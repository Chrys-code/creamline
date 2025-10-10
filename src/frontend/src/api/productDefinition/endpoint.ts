import { makeEndpoint } from "@zodios/core";
import z from "zod";
import { ProductDefinitionSchema } from "./schema";

export const ListProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/",
	alias: "v1_product_definition_list",
	requestFormat: "json",
	response: z.array(ProductDefinitionSchema),
});

export const GetProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/:id/",
	alias: "v1_product_definition_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: ProductDefinitionSchema,
});
