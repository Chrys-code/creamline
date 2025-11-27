import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const GetProductDefinition = makeEndpoint({
	method: "get",
	path: "/api/v1/product-definition/:uuid/",
	alias: "v1_product_definition_retrieve",
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
	alias: "v1_product_definition_list_paginated",
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
	alias: "v1_product_definition_list",
	requestFormat: "json",
	response: schemas.ListProductDefinitionSchema,
});

const CreateProductDefinitionEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/product-definition/",
	alias: "v1_product_definition_create",
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
	method: "put",
	path: "/api/v1/product-definition/:uuid/",
	alias: "v1_product_definition_update",
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
	alias: "v1_product_definition_types_retrieve",
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
