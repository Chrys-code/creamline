import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const GetProductDefinition = makeEndpoint({
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
	response: schemas.ProductDefinitionSchema,
});

const ListProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/",
	alias: "v1_product_definition_list",
	requestFormat: "json",
	response: z.array(schemas.ProductDefinitionSchema),
});

const endpoints = makeApi([GetProductDefinition, ListProductDefinition]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
