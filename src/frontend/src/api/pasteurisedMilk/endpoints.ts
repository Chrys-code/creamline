import { makeEndpoint } from "@zodios/core";
import z from "zod";
import PasteurisedMilkSchema from "./schema";

export const ListPasteurisedMilk = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteurised-milk/",
	alias: "v1_pasteurised_milk_list",
	requestFormat: "json",
	response: z.array(PasteurisedMilkSchema),
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
			schema: z.number().int(),
		},
	],
	response: PasteurisedMilkSchema,
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
			schema: PasteurisedMilkSchema,
		},
	],
	response: PasteurisedMilkSchema,
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
			schema: PasteurisedMilkSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: PasteurisedMilkSchema,
});
