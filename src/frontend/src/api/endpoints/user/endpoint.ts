import { makeEndpoint } from "@zodios/core";
import z from "zod";

import { CreateUserSchema, ListUserSchema, PatchUserSchema, UserSchema } from "./schema";

export const ListUserEndpoint = makeEndpoint({
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
	response: ListUserSchema,
});

export const GetUserEndpoint = makeEndpoint({
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
	response: UserSchema,
});

export const CreateUserEndpoint = makeEndpoint({
	method: "post",
	path: "/api/v1/users/",
	alias: "v1_users_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: CreateUserSchema,
		},
	],
	response: UserSchema,
});

export const PatchUserEndpoint = makeEndpoint({
	method: "patch",
	path: "/api/v1/users/:uuid/",
	alias: "v1_users_partial_update",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: PatchUserSchema,
		},
		{
			name: "uuid",
			type: "Path",
			schema: z.string().uuid(),
		},
	],
	response: UserSchema,
});

export const DeleteUserEndpoint = makeEndpoint({
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
