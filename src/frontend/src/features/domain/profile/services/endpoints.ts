import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";

const GetProfileEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/profile/",
	alias: "v1_profile_retrieve",
	requestFormat: "json",
	response: schemas.ProfileSchema,
});

const PatchProfileEndpoint = makeEndpoint({
	method: "put",
	path: "/api/v1/profile/",
	alias: "v1_profile_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchProfileFormSchema,
		},
	],
	response: schemas.ProfileSchema,
});

const endpoints = makeApi([GetProfileEndpoint, PatchProfileEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
