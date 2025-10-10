import z from "zod";
import ProducerSchema from "./schema";
import { makeEndpoint } from "@zodios/core";

export const ListProducerEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/producer/",
	alias: "v1_producer_list",
	requestFormat: "json",
	response: z.array(ProducerSchema),
});

export const GetProducerEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/producer/:id/",
	alias: "v1_producer_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: ProducerSchema,
});

export const CreateProducerEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/producer/",
	alias: "v1_producer_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: ProducerSchema,
		},
	],
	response: ProducerSchema,
});

export const UpdateProducerEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/producer/:id/",
	alias: "v1_producer_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: ProducerSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: ProducerSchema,
});

export const DeleteProducerEndpoint = makeEndpoint({
	method: "delete",
	path: "/api/v1/producer/:id/",
	alias: "v1_producer_destroy",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: z.void(),
});
