import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

import schemas from "./schemas";

const ListUserEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/users/",
	alias: "v1_users_list",
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
	response: schemas.ListUserSchema,
});

const GetUserEndpoint = makeEndpoint({
	method: "get",
	path: "/api/v1/users/:uuid/",
	alias: "v1_users_retrieve",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.UserSchema,
});

const CreateUserEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/users/",
	alias: "v1_users_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.CreateUserFormSchema,
		},
	],
	response: schemas.UserSchema,
});

const PatchUserEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/users/:uuid/",
	alias: "v1_users_partial_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.PatchUserFormSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: schemas.UserSchema,
});

const DeleteUserEndpoint = makeEndpoint({
	method: "delete",
	path: "/api/v1/users/:uuid/",
	alias: "v1_users_destroy",
	requestFormat: "json",
	parameters: [
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: z.void(),
});

const userEndpoints = makeApi([
	ListUserEndpoint,
	GetUserEndpoint,
	CreateUserEndpoint,
	PatchUserEndpoint,
	DeleteUserEndpoint,
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, userEndpoints, options);
}
