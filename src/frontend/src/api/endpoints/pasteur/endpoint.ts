import { makeEndpoint } from "@zodios/core";
import { z } from "zod";
import { PasteurSchema, CreatePasteurSchema, PatchPasteurSchema } from "./schema";

export const ListPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/",
	alias: "v1_pasteur_list",
	requestFormat: "json",
	response: z.array(PasteurSchema),
});

export const GetPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/:id/",
	alias: "v1_pasteur_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: PasteurSchema,
});

export const CreatePasteurEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/pasteur/",
	alias: "v1_pasteur_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreatePasteurSchema,
		},
	],
	response: PasteurSchema,
});

export const PatchPasteurEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/pasteur/:id/",
	alias: "v1_pasteur_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchPasteurSchema,
		},
		{
			name: "id",
			type: "Path",
			schema: z.number().int(),
		},
	],
	response: PasteurSchema,
});
