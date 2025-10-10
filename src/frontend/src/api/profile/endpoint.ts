import { makeEndpoint } from "@zodios/core";

import { ProfileSchema, PatchedProfileSchema } from "./schema";
import z from "zod";

export const GetProfileEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/profile/",
	alias: "v1_profile_retrieve",
	requestFormat: "json",
	response: ProfileSchema,
});

export const UpdateProfileEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/profile/",
	alias: "v1_profile_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchedProfileSchema,
		},
	],
	response: ProfileSchema,
});

export const DeleteProfileEndpoint = makeEndpoint({
	method: "delete",
	path: "/api/v1/profile/",
	alias: "v1_profile_destroy",
	requestFormat: "json",
	response: z.void(),
});
