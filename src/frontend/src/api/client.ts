import { getCookie } from "../helpers/cookie";

export const api_client = async ({
	endpoint,
	method,
	payload
}: {
	endpoint: string,
	method: "GET" | "POST" | "PATCH" | "DELETE",
	payload: BodyInit | null | undefined
}): Promise<any> => {
	const response = await fetch(`/${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		credentials: 'include',
		body: JSON.stringify(payload),
	});

	return response
}
