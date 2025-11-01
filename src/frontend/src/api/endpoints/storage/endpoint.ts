import z from "zod";
import { StorageSchema, CreateStorageSchema, PatchStorageSchema } from "./schema";
import { makeEndpoint } from "@zodios/core";

export const ListStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/",
	alias: "v1_storage_list",
	requestFormat: "json",
	response: z.array(StorageSchema),
});

export const GetStorageEndpoint = makeEndpoint({
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
	response: StorageSchema,
});

export const CreateStorageEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/storage/",
	alias: "v1_storage_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateStorageSchema,
		},
	],
	response: StorageSchema,
});

export const PatchStorageEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/storage/:id/",
	alias: "v1_storage_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchStorageSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: StorageSchema,
});
