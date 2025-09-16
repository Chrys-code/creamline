import { api_client } from "../client"

export const getStorages = async () =>
    await api_client({ endpoint: "api/v1/storage/", method: "GET", payload: undefined })
