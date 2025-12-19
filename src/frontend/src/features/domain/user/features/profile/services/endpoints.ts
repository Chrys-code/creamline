import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import schemas from "./schemas";
import z from "zod";

const GetProfileEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/profile/",
	alias: "getProfile",
	requestFormat: "json",
	response: schemas.ProfileSchema,
});

const PatchProfileEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/profile/",
	alias: "updateProfile",
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

const GetProfilePreviewEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/profile-preview/",
	alias: "getProfilePreview",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Query",
			schema: z.string().uuid(),
		},
	],
	response: schemas.ProfilePreviewSchema,
});

const endpoints = makeApi([GetProfileEndpoint, PatchProfileEndpoint, GetProfilePreviewEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
