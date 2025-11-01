import { makeEndpoint } from "@zodios/core";
import z from "zod";
import { MilkSchema, ListMilkSchema, CreateMilkSchema, PatchMilkSchema } from "./schema";

export const ListMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/",
	alias: "v1_milk_list",
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
	response: ListMilkSchema,
});

export const GetMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/:id/",
	alias: "v1_milk_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.string(),
		},
	],
	response: MilkSchema,
});

export const CreateMilkEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/milk/",
	alias: "v1_milk_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateMilkSchema,
		},
	],
	response: MilkSchema,
});

export const PatchMilkEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/milk/:id/",
	alias: "v1_milk_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchMilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: MilkSchema,
});
