import { makeEndpoint } from "@zodios/core";
import { RoleSchema } from "./schema";

const GetRolesEndpoint = makeEndpoint({
	method: "get",
	path: "/api/roles/",
	alias: "roles_retrieve",
	requestFormat: "json",
	response: RoleSchema,
});

export default GetRolesEndpoint;
