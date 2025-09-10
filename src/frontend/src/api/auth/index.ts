import { api_client } from "../client"

export const signup = async (payload: { email: string, password: string }) =>
	await api_client({ endpoint: "api/signup/", method: "POST", payload: payload })

export const login = async (payload: { email: string, password: string }) =>
    await api_client({ endpoint: "api/login/", method: "POST", payload: payload })

export const logout = async () =>
	await api_client({ endpoint: "api/logout/", method: "POST", payload: null })

export const session = async () =>
	await api_client({ endpoint: "api/session/", method: "GET", payload: undefined })