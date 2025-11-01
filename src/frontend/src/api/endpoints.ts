import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import z from "zod";
import { LoginEndpoint, LogoutEndpoint, SessionEndpoint, GetRolesEndpoint } from "./endpoints/auth";
import {
	ListUserEndpoint,
	GetUserEndpoint,
	PatchUserEndpoint,
	DeleteUserEndpoint,
} from "./endpoints/user/endpoint";
import {
	CreateMilkEndpoint,
	GetMilkEndpoint,
	ListMilkEndpoint,
	PatchMilkEndpoint,
} from "./endpoints/milk/endpoint";
import {
	ListPasteurEndpoint,
	GetPasteurEndpoint,
	CreatePasteurEndpoint,
	PatchPasteurEndpoint,
} from "./endpoints/pasteur/endpoint";
import {
	ListStorageEndpoint,
	GetStorageEndpoint,
	CreateStorageEndpoint,
	PatchStorageEndpoint,
} from "./endpoints/storage/endpoint";
import {
	CreatePasteurisedMilkEndpoint,
	GetPasteurisedMilkEndpoint,
	ListPasteurisedMilkEndpoint,
	PatchPasteurisedMilkEndpoint,
} from "./endpoints/pasteurisedMilk/endpoints";
import {
	GetProducerEndpoint,
	CreateProducerEndpoint,
	ListProducerEndpoint,
	PatchProducerEndpoint,
} from "./endpoints/producer/endpoint";
import {
	GetProductDefinition,
	ListProductDefinition,
} from "./endpoints/productDefinition/endpoint";
import { GetProfileEndpoint, PatchProfileEndpoint } from "./endpoints/profile/endpoint";

const endpoints = makeApi([
	LoginEndpoint,
	LogoutEndpoint,
	SessionEndpoint,
	GetRolesEndpoint,

	ListUserEndpoint,
	GetUserEndpoint,
	PatchUserEndpoint,
	DeleteUserEndpoint,

	GetProfileEndpoint,
	PatchProfileEndpoint,

	ListMilkEndpoint,
	GetMilkEndpoint,
	CreateMilkEndpoint,
	PatchMilkEndpoint,

	ListPasteurEndpoint,
	GetPasteurEndpoint,
	CreatePasteurEndpoint,
	PatchPasteurEndpoint,

	ListStorageEndpoint,
	GetStorageEndpoint,
	CreateStorageEndpoint,
	PatchStorageEndpoint,

	ListPasteurisedMilkEndpoint,
	GetPasteurisedMilkEndpoint,
	CreatePasteurisedMilkEndpoint,
	PatchPasteurisedMilkEndpoint,

	ListProducerEndpoint,
	GetProducerEndpoint,
	CreateProducerEndpoint,
	PatchProducerEndpoint,

	ListProductDefinition,
	GetProductDefinition,

	{
		method: "get",
		path: "/api/schema/",
		alias: "schema_retrieve",
		description: `OpenApi3 schema for this API. Format can be selected via content negotiation.

- YAML: application/vnd.oai.openapi
- JSON: application/vnd.oai.openapi+json`,
		requestFormat: "json",
		parameters: [
			{
				name: "format",
				type: "Query",
				schema: z.enum(["json", "yaml"]).optional(),
			},
			{
				name: "lang",
				type: "Query",
				schema: z.enum(["en", "hu"]).optional(),
			},
		],
		response: z.object({}).partial().passthrough(),
	},
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
