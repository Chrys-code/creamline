import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const PaginatedListMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/",
	alias: "v1_milk_list_paginated",
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
	response: schemas.PaginatedListMilkSchema,
});

const GetMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/:id/",
	alias: "v1_milk_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: schemas.MilkSchema,
});

const CreateMilkEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/milk/",
	alias: "v1_milk_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateMilkFormSchema,
		},
	],
	response: schemas.MilkSchema,
});

const PatchMilkEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/milk/:id/",
	alias: "v1_milk_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchMilkFormSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.MilkSchema,
});

const endpoints = makeApi([
	PaginatedListMilkEndpoint,
	GetMilkEndpoint,
	CreateMilkEndpoint,
	PatchMilkEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
