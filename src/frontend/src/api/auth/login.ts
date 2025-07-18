import { api_client } from "../client"

export const login = async (payload: { email: string, password: string }) =>
	await api_client({ endpoint: "api/login/", method: "POST", payload: payload })