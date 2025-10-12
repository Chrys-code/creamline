import { makeEndpoint } from "@zodios/core";
import z from "zod";
import { PaginatedMilkListSchema, GetMilkSchema, CreateUpdateMilkSchema } from "./schema";

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
	response: PaginatedMilkListSchema,
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
			schema: z.number().int(),
		},
	],
	response: GetMilkSchema,
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
			schema: CreateUpdateMilkSchema,
		},
	],
	response: GetMilkSchema,
});

export const UpdateMilkEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/milk/:id/",
	alias: "v1_milk_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateUpdateMilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: GetMilkSchema,
});
