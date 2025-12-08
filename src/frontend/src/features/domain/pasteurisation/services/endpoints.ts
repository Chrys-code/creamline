import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

import schemas from "./schemas";

const ListPasteurisedMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurisation/",
	alias: "v1_pasteurisation_list",
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
	response: schemas.PaginatedPasteurisationListSchema,
});

const GetPasteurisedMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurisation/:id/",
	alias: "v1_pasteurisation_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: schemas.Pasteurisation,
});

const CreatePasteurisedMilkEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteurisation/",
	alias: "v1_pasteurisation_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreatePasteurisationFormSchema,
		},
	],
	response: schemas.Pasteurisation,
});

const PatchPasteurisedMilkEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/pasteurisation/:id/",
	alias: "v1_pasteurisation_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchPasteurisationFormSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.Pasteurisation,
});

const PasteurisationSummaryAnalytics = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/pasteurisation/summary/",
	alias: "getPasteurisationSummary",
	response: schemas.PasteurisationSummarySchema,
});

const endpoints = makeApi([
	ListPasteurisedMilkEndpoint,
	GetPasteurisedMilkEndpoint,
	CreatePasteurisedMilkEndpoint,
	PatchPasteurisedMilkEndpoint,
	PasteurisationSummaryAnalytics,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
