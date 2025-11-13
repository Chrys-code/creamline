import z from "zod";
import schemas from "./schemas";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

const ListStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/",
	alias: "v1_storage_list",
	requestFormat: "json",
	response: z.array(schemas.StorageSchema),
});

const GetStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/:id/",
	alias: "v1_storage_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
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
	path: "/api/v1/storage/:id/",
	alias: "v1_storage_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchStorageFormSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.StorageSchema,
});

const endpoints = makeApi([
	ListStorageEndpoint,
	GetStorageEndpoint,
	CreateStorageEndpoint,
	PatchStorageEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
