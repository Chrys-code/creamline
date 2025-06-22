import { api_client } from "../client"

export const logout = async () => {
	const response = await api_client({ endpoint: "auth/logout/", method: "POST", payload: null })

	if (response.status !== 200) {
		window.location.href = "/auth/login/";
	}
}