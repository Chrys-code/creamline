import { getCookie } from "../helpers/cookie";

export const api_client = ({
	endpoint,
	method,
	payload
}: {
	endpoint: string,
	method: "GET" | "POST" | "PATCH" | "DELETE",
	payload: any
}) => {
	fetch(`/api/v1/${endpoint}/`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		credentials: 'include',
		body: JSON.stringify(payload),
	});
}
