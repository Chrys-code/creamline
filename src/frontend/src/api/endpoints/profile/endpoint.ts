import { makeEndpoint } from "@zodios/core";

import { ProfileSchema, PatchProfileSchema } from "./schema";

export const GetProfileEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/profile/",
	alias: "v1_profile_retrieve",
	requestFormat: "json",
	response: ProfileSchema,
});

export const PatchProfileEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/profile/",
	alias: "v1_profile_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchProfileSchema,
		},
	],
	response: ProfileSchema,
});
