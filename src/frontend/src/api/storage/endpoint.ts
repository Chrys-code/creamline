import z from "zod";
import { CreateUpdateStorageSchema, GetStorageSchema } from "./schema";
import { makeEndpoint } from "@zodios/core";

export const ListStorageEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage/",
	alias: "v1_storage_list",
	requestFormat: "json",
	response: z.array(GetStorageSchema),
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
			schema: CreateUpdateStorageSchema,
		},
	],
	response: GetStorageSchema,
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
	response: GetStorageSchema,
});

export const UpdateStorageEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/storage/:id/",
	alias: "v1_storage_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateUpdateStorageSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: GetStorageSchema,
});

export const DeleteStorageEndpoint = makeEndpoint({
	method: "delete",
	path: "/api/v1/storage/:id/",
	alias: "v1_storage_destroy",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: z.void(),
});
