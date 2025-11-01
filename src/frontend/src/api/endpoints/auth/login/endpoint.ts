import { makeEndpoint } from "@zodios/core";
import LoginSchema from "./schema";

const LoginEndpoint = makeEndpoint({
	method: "post",
	path: "/api/login/",
	alias: "login_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: LoginSchema,
		},
	],
	response: LoginSchema,
});

export default LoginEndpoint;
