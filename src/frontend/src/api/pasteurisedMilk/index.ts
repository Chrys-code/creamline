import { api_client } from "../client"

export const createPasteurisedMilk = async (payload: {
    pasteur: string,
    product_definition: string,
    temperature: string,
    source_storage: string,
    target_storage: string,
    volume_liter: number,
    volume_kg: number,
    start_time: string,
    end_time: string
}) =>
    await api_client({ endpoint: "api/v1/pasteurised-milk/", method: "POST", payload })
