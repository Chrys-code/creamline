import { api_client } from "../client"

export const createMilk = async (payload: {
	producer: string,
	volume_liters: number,
	volume_kg: number,
	temperature: number,
	inhibitory_residue: boolean,
	aflatoxin: boolean,
	acid_content: number
}) =>
	await api_client({ endpoint: "api/v1/milk/", method: "POST", payload: payload })