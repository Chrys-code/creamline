import { getCookie } from "../lib/helpers/cookie";

export const api_client = async ({
	endpoint,
	method,
	payload
}: {
	endpoint: string,
	method: "GET" | "POST" | "PATCH" | "DELETE",
	payload: any
}): Promise<{ response: any, controller: AbortController }> => {
	const controller = new AbortController();

	const unsafeRequests = ["POST", "PATCH", "DELETE"];
	const methodIsUnsafe = unsafeRequests.includes(method);

	const headers = {
		"Content-Type": "application/json",
	}

	if (methodIsUnsafe) {
		// @ts-ignore
		headers["X-CSRFToken"] = getCookie("csrftoken");
	};

	const response = await fetch(`/${endpoint}`, {
		method,
		headers: headers,
		credentials: "include",
		redirect: "follow",
		body: JSON.stringify(payload),
		signal: controller.signal
	});

	return { response, controller }
}
