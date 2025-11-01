import z from "zod";
import { makeEndpoint } from "@zodios/core";
import {
	PasteurisedMilk,
	ListPasteurisedMilkSchema,
	CreatePasteurisedMilkSchema,
	PatchPasteurisedMilkSchema,
} from "./schema";

export const ListPasteurisedMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurised-milk/",
	alias: "v1_pasteurised_milk_list",
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
	response: ListPasteurisedMilkSchema,
});

export const GetPasteurisedMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurised-milk/:id/",
	alias: "v1_pasteurised_milk_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: PasteurisedMilk,
});

export const CreatePasteurisedMilkEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteurised-milk/",
	alias: "v1_pasteurised_milk_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreatePasteurisedMilkSchema,
		},
	],
	response: PasteurisedMilk,
});

export const PatchPasteurisedMilkEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/pasteurised-milk/:id/",
	alias: "v1_pasteurised_milk_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchPasteurisedMilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: PasteurisedMilk,
});
