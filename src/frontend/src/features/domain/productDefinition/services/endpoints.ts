import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const GetProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/:uuid/",
	alias: "getProductDefinition",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Path",
			schema: z.string(),
		},
	],
	response: schemas.ProductDefinitionSchema,
});

const PaginatedListProductDefinitionEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/",
	alias: "getPaginatedProductDefinitionList",
	requestFormat: "json",
	parameters: [
		{
			name: "page",
			type: "Query",
			schema: z.number().int().optional(),
		},
		{
			name: "page_size",
			type: "Query",
			schema: z.number().int().optional(),
		},
	],
	response: schemas.PaginatedListProductDefinitionSchema,
});

const ListProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/all",
	alias: "getProductDefinitionList",
	requestFormat: "json",
	response: schemas.ListProductDefinitionSchema,
});

const CreateProductDefinitionEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/product-definition/",
	alias: "createProductDefinition",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateProductDefinitionFormSchema,
		},
	],
	response: schemas.ProductDefinitionSchema,
});

const PatchProductDefinitionEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/product-definition/:uuid/",
	alias: "updateProductDefinition",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchProductDefinitionFormSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.ProductDefinitionSchema,
});

const GetProductDefinitionOptinosEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/types/",
	alias: "getProductDefinitionTypes",
	requestFormat: "json",
	response: z.array(schemas.ProductDefinitionOptionsSchema),
});

const endpoints = makeApi([
	GetProductDefinition,
	ListProductDefinition,
	PaginatedListProductDefinitionEndpoint,
	CreateProductDefinitionEndpoint,
	PatchProductDefinitionEndpoint,
	GetProductDefinitionOptinosEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
