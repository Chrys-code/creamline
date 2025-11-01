import { makeEndpoint } from "@zodios/core";
import z from "zod";

const SessionEndpoint = makeEndpoint({
	method: "get",
	path: "/api/session/",
	alias: "session_retrieve",
	requestFormat: "json",
	response: z.void(),
});

export default SessionEndpoint;
