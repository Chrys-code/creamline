import { api_client } from "../client"

export const logout = async () =>
	await api_client({ endpoint: "api/logout/", method: "POST", payload: null })