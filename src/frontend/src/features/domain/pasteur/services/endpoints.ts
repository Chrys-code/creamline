import { z } from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const ListPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/all",
	alias: "getPasteurList",
	requestFormat: "json",
	response: schemas.ListPasteurSchema,
});

const PaginatedListPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/",
	alias: "getPaginatedPasteurList",
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
	response: schemas.PaginatedListPasteurSchema,
});

const GetPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/:id/",
	alias: "getPasteur",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: schemas.PasteurSchema,
});

const CreatePasteurEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteur/",
	alias: "createPasteur",
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
	method: "patch",
	path: "/api/v1/pasteur/:uuid/",
	alias: "updatePasteur",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchPasteurFormSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.PasteurSchema,
});

const DeletePasteurEndpoint = makeEndpoint({
	method: "delete",
	path: "/api/v1/pasteur/:id/",
	alias: "deletePasteur",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: z.void(),
});

const endpoints = makeApi([
	ListPasteurEndpoint,
	PaginatedListPasteurEndpoint,
	GetPasteurEndpoint,
	CreatePasteurEndpoint,
	PatchPasteurEndpoint,
	DeletePasteurEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
