import type { APIResponse } from "@/lib/types/Response.types"
import { api_client } from "../client"
import type { Email } from "./email.types"

const deleteEmail = async (id: string): Promise<APIResponse<Email[]>> => {
	try {
		const response = await api_client({ endpoint: `/api/v1/emails/${id}`, method: "DELETE", payload: undefined })
		const responseJson = await response.json()

		if (response.statusCode !== 204) {
			return {
				success: false,
				message: responseJson.message,
				result: [],
			}
		}

		return {
			success: true,
			message: responseJson.message,
			result: responseJson.data,
		}

	} catch (e) {
		return {
			success: false,
			message: "Email could not be deleted",
			result: [],
		}
	}
}

export default deleteEmail