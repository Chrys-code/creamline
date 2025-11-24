import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const PaginatedListProducerEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/producer/",
	alias: "v1_producer_list_paginated",
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
	response: schemas.PaginatedListProducerSchema,
});

const ListProducerEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/producer/all",
	alias: "v1_producer_list",
	requestFormat: "json",
	response: z.array(schemas.ProducerSchema),
});

const GetProducerEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/producer/:uuid/",
	alias: "v1_producer_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.ProducerSchema,
});

const CreateProducerEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/producer/",
	alias: "v1_producer_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateProducerFormSchema,
		},
	],
	response: schemas.ProducerSchema,
});

const PatchProducerEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/producer/:uuid/",
	alias: "v1_producer_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchProducerFormSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.ProducerSchema,
});

const endpoints = makeApi([
	PaginatedListProducerEndpoint,
	ListProducerEndpoint,
	GetProducerEndpoint,
	CreateProducerEndpoint,
	PatchProducerEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
