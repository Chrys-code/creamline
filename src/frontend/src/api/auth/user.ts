import { api_client } from "../client"

export const user = async () => {
	const response = await api_client({ endpoint: "auth/user/", method: "GET", payload: undefined })

	if (!response.ok) {
		window.location.href = "/auth/login/";
	}
}