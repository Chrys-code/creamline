import z from "zod";
import schemas from "./schemas";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

const PaginatedListStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/",
	alias: "v1_storage_list_paginated",
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
	response: schemas.PaginatedListStorageSchema,
});

const ListStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/all",
	alias: "v1_storage_list",
	requestFormat: "json",
	response: z.array(schemas.StorageSchema),
});

const GetStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/:uuid/",
	alias: "v1_storage_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.StorageSchema,
});

const CreateStorageEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/storage/",
	alias: "v1_storage_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateStorageFormSchema,
		},
	],
	response: schemas.StorageSchema,
});

const PatchStorageEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/storage/:uuid/",
	alias: "v1_storage_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchStorageFormSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.StorageSchema,
});

const endpoints = makeApi([
	PaginatedListStorageEndpoint,
	ListStorageEndpoint,
	GetStorageEndpoint,
	CreateStorageEndpoint,
	PatchStorageEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
