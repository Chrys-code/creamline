import { api_client } from "../client"

export const getProductDefinitions = async () =>
    await api_client({ endpoint: "api/v1/product-definition/", method: "GET", payload: undefined })
