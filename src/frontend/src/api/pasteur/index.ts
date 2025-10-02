import { api_client } from "../client"

export const getPasteurs = async () =>
    await api_client({ endpoint: "api/v1/pasteur/", method: "GET", payload: undefined })
