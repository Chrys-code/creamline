import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import z from "zod";

import schemas from "./schemas";

const ListStorageTypeEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/storage-types/",
	alias: "get_storage_types",
	requestFormat: "json",
	response: z.array(schemas.BaseStorageTypeSchema),
});

const endpoints = makeApi([ListStorageTypeEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
