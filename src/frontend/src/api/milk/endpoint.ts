import { makeEndpoint } from "@zodios/core";
import z from "zod";
import MilkSchema from "./schema";

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
	response: MilkSchema,
});

export const ListMilkEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/milk/",
	alias: "v1_milk_list",
	requestFormat: "json",
	response: z.array(MilkSchema),
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
			schema: MilkSchema,
		},
	],
	response: MilkSchema,
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
			schema: MilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: MilkSchema,
});
