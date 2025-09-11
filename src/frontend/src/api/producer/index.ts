import { api_client } from "../client"

export const createProducer = async (payload: {
	name: string,
	address: string,
	contact_email: string
}) =>
	await api_client({ endpoint: "api/v1/producer/", method: "POST", payload })

export const getProducers = async () =>
	await api_client({
		endpoint: "api/v1/producer/", method: "GET", payload: undefined
	})