import { api_client } from "../client"

export const user = async () =>
	await api_client({ endpoint: "api/me", method: "GET", payload: undefined })