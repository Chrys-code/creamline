import { api_client } from "../client"

export const getProfile = async () =>
    await api_client({ endpoint: "api/v1/profile/", method: "GET", payload: undefined })

export const updateProfile = async (payload: { profile_image?:string, first_name?:string, last_name?:string }) =>
    await api_client({ endpoint: "api/v1/profile/", method: "PATCH", payload: payload })
