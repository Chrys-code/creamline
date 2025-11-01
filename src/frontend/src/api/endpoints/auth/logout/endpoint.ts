import { makeEndpoint } from "@zodios/core";
import z from "zod";

const LogoutEndpoint = makeEndpoint({
	method: "post",
	path: "/api/logout/",
	alias: "logout_create",
	requestFormat: "json",
	response: z.void(),
});

export default LogoutEndpoint;
