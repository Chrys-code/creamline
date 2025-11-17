import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import z from "zod";

import schemas from "./schemas";

const ListUserGroupEndpoint = makeEndpoint({
	method: "get",
	path: "/api/user-groups/",
	alias: "get_user_groups",
	requestFormat: "json",
	response: z.array(schemas.UserGroupBaseSchema),
});

const endpoints = makeApi([ListUserGroupEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
