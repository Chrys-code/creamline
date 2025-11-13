import { z } from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const ListPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/",
	alias: "v1_pasteur_list",
	requestFormat: "json",
	response: z.array(schemas.PasteurSchema),
});

const GetPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/:id/",
	alias: "v1_pasteur_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.PasteurSchema,
});

const CreatePasteurEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteur/",
	alias: "v1_pasteur_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreatePasteurFormSchema,
		},
	],
	response: schemas.PasteurSchema,
});

const PatchPasteurEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/pasteur/:id/",
	alias: "v1_pasteur_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchPasteurFormSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.PasteurSchema,
});

const endpoints = makeApi([
	ListPasteurEndpoint,
	GetPasteurEndpoint,
	CreatePasteurEndpoint,
	PatchPasteurEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
