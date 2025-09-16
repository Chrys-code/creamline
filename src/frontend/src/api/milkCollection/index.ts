import { api_client } from "../client"

interface CreateMilkAPIData {
	producer: string,
	volume_liters: number,
	volume_kg: number,
	storage: string,
	temperature: number | undefined,
	inhibitory_residue: boolean | undefined,
	aflatoxin: boolean | undefined,
	acid_content: number | undefined
}

interface CreateMilkAPIResponse {
	producer?: string;
	volume_liters?: string;
	volume_kg?: string;
	temperature?: string;
	inhibitory_residue?: string;
	aflatoxin?: string;
	acid_content?: string;
	storage?: string;
}

export const createMilk = async (payload: CreateMilkAPIData) =>
	await api_client({ endpoint: "api/v1/milk/", method: "POST", payload: payload })