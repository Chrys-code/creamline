import { makeApi, makeEndpoint, Zodios, type ZodiosOptions } from "@zodios/core";
import z from "zod";

import schemas from "./userGroupSchemas";

const ListUserGroupEndpoint = makeEndpoint({
	method: "get",
	path: "/api/user-groups/",
	alias: "getUserGroups",
	requestFormat: "json",
	response: z.array(schemas.UserGroupBaseSchema),
});

const endpoints = makeApi([ListUserGroupEndpoint]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
