import type { ZodiosEndpointDefinition } from "@zodios/core";
import SignupSchema from "./schema";

const SignupEndpoint: ZodiosEndpointDefinition = {
	method: "post",
	path: "/api/signup/",
	alias: "signup_create",
	requestFormat: "json",
	parameters: [
		{
			name: "body",
			type: "Body",
			schema: SignupSchema,
		},
	],
	response: SignupSchema,
};

export default SignupEndpoint;
