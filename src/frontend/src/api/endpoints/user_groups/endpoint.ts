import { makeEndpoint } from "@zodios/core";
import z from "zod";

import { UserGroupBaseSchema } from "./schema";

export const ListUserGroupEndpoint = makeEndpoint({
	method: "get",
	path: "/api/user-groups/",
	alias: "get_user_groups",
	requestFormat: "json",
	response: z.array(UserGroupBaseSchema),
});
