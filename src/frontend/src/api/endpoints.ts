import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import z from "zod";
import { LoginEndpoint, LogoutEndpoint, SessionEndpoint, SignupEndpoint } from "./auth";
import { CreateMilkEndpoint, GetMilkEndpoint, ListMilkEndpoint, UpdateMilkEndpoint } from "./milk";
import { GetPasteurEndpoint, ListPasteurEndpoint } from "./pasteur";
import {
	CreateStorageEndpoint,
	DeleteStorageEndpoint,
	GetStorageEndpoint,
	ListStorageEndpoint,
	UpdateStorageEndpoint,
} from "./storage";
import {
	CreatePasteurisedMilk,
	GetPasteurisedMilk,
	ListPasteurisedMilk,
	UpdatePasteurisedMilk,
} from "./pasteurisedMilk";
import {
	CreateProducerEndpoint,
	DeleteProducerEndpoint,
	GetProducerEndpoint,
	ListProducerEndpoint,
	UpdateProducerEndpoint,
} from "./producer";
import { GetProductDefinition, ListProductDefinition } from "./productDefinition";
import { DeleteProfileEndpoint, GetProfileEndpoint, UpdateProfileEndpoint } from "./profile";

const endpoints = makeApi([
	// Auth Endpoints
	SignupEndpoint,
	LoginEndpoint,
	LogoutEndpoint,
	SessionEndpoint,

	// Milk Collection Endpoints
	ListMilkEndpoint,
	GetMilkEndpoint,
	CreateMilkEndpoint,
	UpdateMilkEndpoint,

	// Pasteur Endpoints
	ListPasteurEndpoint,
	GetPasteurEndpoint,

	// Storage Endpoints
	ListStorageEndpoint,
	GetStorageEndpoint,
	CreateStorageEndpoint,
	UpdateStorageEndpoint,
	DeleteStorageEndpoint,

	// Pasteurised Milk Endpoints
	ListPasteurisedMilk,
	GetPasteurisedMilk,
	CreatePasteurisedMilk,
	UpdatePasteurisedMilk,

	// Producer Endpoints
	ListProducerEndpoint,
	GetProducerEndpoint,
	CreateProducerEndpoint,
	UpdateProducerEndpoint,
	DeleteProducerEndpoint,

	// Product Definition Endpoints
	ListProductDefinition,
	GetProductDefinition,

	// Profile Endpoints
	GetProfileEndpoint,
	UpdateProfileEndpoint,
	DeleteProfileEndpoint,

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
