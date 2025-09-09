import { api_client } from "../client"

export const milkCollection = async (payload: {
	source: string,
	amountLire: number,
	amountKg: number,
	temperature: number,
	limitter: string,
	aflatoxin: string,
	acidlevel: number
}) =>
	await api_client({ endpoint: "api/milk-collection/", method: "POST", payload: payload })