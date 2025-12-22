import z from "zod";
import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";

import schemas from "./authSchemas";

const LoginEndpoint = makeEndpoint({
	method: "post",
	path: "/api/login/",
	alias: "login",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: schemas.LoginFormSchema,
		},
	],
	response: schemas.LoginFormSchema,
});

const LogoutEndpoint = makeEndpoint({
	method: "post",
	path: "/api/logout/",
	alias: "logout",
	requestFormat: "json",
	parameters: [],
	response: z.void(),
});

const GetRolesEndpoint = makeEndpoint({
	method: "get",
	path: "/api/roles/",
	alias: "roles_retrieve",
	requestFormat: "json",
	response: schemas.RoleSchema,
});

const SessionEndpoint = makeEndpoint({
	method: "get",
	path: "/api/session/",
	alias: "session_retrieve",
	requestFormat: "json",
	response: z.void(),
});

const endpoints = makeApi([LoginEndpoint, LogoutEndpoint, GetRolesEndpoint, SessionEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
