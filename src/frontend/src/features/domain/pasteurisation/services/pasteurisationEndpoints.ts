import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

import schemas from "./pasteurisationSchemas";

const ListPasteurisedMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurisation/",
	alias: "getPasteurisationList",
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
	alias: "getPasteurisation",
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
	alias: "createPasteurisation",
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
	alias: "updatePasteurisation",
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

const GetPasteurisationSummaryAnalytics = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/pasteurisation/summary/",
	alias: "getPasteurisationSummaryAnalytics",
	response: schemas.PasteurisationSummarySchema,
});

const GetPasteurisationTimeSeriesAnalytics = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/pasteurisation/time-series/",
	alias: "getPasteurisationTimeSeriesAnalytics",
	parameters: [
		{
			name: "start_date",
			type: "Query",
			schema: z.string().optional(),
		},
		{
			name: "end_date",
			type: "Query",
			schema: z.string().optional(),
		},
		{
			name: "interval",
			type: "Query",
			schema: z.enum(["day", "week", "month", "quarter", "year"]).optional(),
		},
		{
			name: "pasteur_uuid",
			type: "Query",
			schema: z.string().optional(),
		},
	],
	response: z.array(schemas.PasteurisationTimeSeriesSchema),
});

const GetPasteurisationSegmentedByPasteurAnalytics = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/pasteurisation/by-pasteurs/",
	alias: "getPasteurisationAnalyticsSegmentedByPasteurs",
	parameters: [
		{
			name: "interval",
			type: "Query",
			schema: z.enum(["day", "week", "month", "quarter", "year"]).optional(),
		},
	],
	response: z.array(schemas.PasteurisationSegmentedByPasteurSchema),
});

const endpoints = makeApi([
	ListPasteurisedMilkEndpoint,
	GetPasteurisedMilkEndpoint,
	CreatePasteurisedMilkEndpoint,
	PatchPasteurisedMilkEndpoint,
	GetPasteurisationSummaryAnalytics,
	GetPasteurisationTimeSeriesAnalytics,
	GetPasteurisationSegmentedByPasteurAnalytics,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
