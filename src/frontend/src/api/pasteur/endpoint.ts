import { makeEndpoint } from "@zodios/core";
import { z } from "zod";
import PasteurSchema from "./schema";

const ListPasteurEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/pasteur/",
	alias: "v1_pasteur_list",
	requestFormat: "json",
	response: z.array(PasteurSchema),
});

const GetPasteurEndpoint = makeEndpoint({
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

export { ListPasteurEndpoint, GetPasteurEndpoint };
