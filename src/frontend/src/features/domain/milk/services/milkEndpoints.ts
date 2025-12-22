import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

import schemas from "./milkSchemas";

const PaginatedMilkListEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/",
	alias: "getPaginatedMilkList",
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
	response: schemas.PaginatedListMilkSchema,
});

const GetMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/:id/",
	alias: "getMilk",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: schemas.MilkSchema,
});

const CreateMilkEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/milk/",
	alias: "createMilk",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateMilkFormSchema,
		},
	],
	response: schemas.MilkSchema,
});

const PatchMilkEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/milk/:id/",
	alias: "updateMilk",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchMilkFormSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: schemas.MilkSchema,
});

const GetMilkSummaryAnalyticsEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/milk/summary/",
	alias: "getGetMilkSummaryAnalytics",
	response: schemas.MilkSummarySchema,
});

const GetMilkTimeSeriesAnalyticsEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/milk/trend/",
	alias: "getGetMilkTimeSeriesAnalytics",
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
			name: "producer_uuid",
			type: "Query",
			schema: z.string().optional(),
		},
	],
	response: z.array(schemas.MilkTrendSchema),
});

const GetMilkAnalyticsSegmentedByProducersEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/analytics/milk/by-producers/",
	alias: "getMilkAnalyticsSegmentedByProducers",
	parameters: [
		{
			name: "interval",
			type: "Query",
			schema: z.enum(["day", "week", "month", "quarter", "year"]).optional(),
		},
	],
	response: z.array(schemas.MilkSegmentedByProducerSchema),
});

const endpoints = makeApi([
	PaginatedMilkListEndpoint,
	GetMilkEndpoint,
	CreateMilkEndpoint,
	PatchMilkEndpoint,
	GetMilkSummaryAnalyticsEndpoint,
	GetMilkTimeSeriesAnalyticsEndpoint,
	GetMilkAnalyticsSegmentedByProducersEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
