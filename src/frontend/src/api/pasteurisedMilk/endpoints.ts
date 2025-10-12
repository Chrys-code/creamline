import z from "zod";
import { makeEndpoint } from "@zodios/core";
import {
	CreateUpdatePasteurisedMilkSchema,
	GetPasteurisedMilkSchema,
	PaginatedPasteurisedMilkSchema,
} from "./schema";

export const ListPasteurisedMilk = makeEndpoint({
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
	response: PaginatedPasteurisedMilkSchema,
});

export const GetPasteurisedMilk = makeEndpoint({
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
	response: GetPasteurisedMilkSchema,
});

export const CreatePasteurisedMilk = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteurised-milk/",
	alias: "v1_pasteurised_milk_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateUpdatePasteurisedMilkSchema,
		},
	],
	response: GetPasteurisedMilkSchema,
});

export const UpdatePasteurisedMilk = makeEndpoint({
	method: "put",
	path: "/api/v1/pasteurised-milk/:id/",
	alias: "v1_pasteurised_milk_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateUpdatePasteurisedMilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: GetPasteurisedMilkSchema,
});
