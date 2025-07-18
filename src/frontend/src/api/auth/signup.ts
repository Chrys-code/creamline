import { api_client } from "../client"

export const signup = async (payload: { email: string, password: string }) =>
	await api_client({ endpoint: "api/signup/", method: "POST", payload: payload })