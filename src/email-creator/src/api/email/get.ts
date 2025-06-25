import type { APIResponse } from "@/lib/types/Response.types"
import { api_client } from "../client"
import type { Email } from "./email.types"

interface GetEmailsProps {
	page: number,
	pageSize: number
}

export const getEmails = async ({ page, pageSize }: GetEmailsProps): Promise<APIResponse<Email[]>> => {
	try {
		const response = await api_client({ endpoint: `/api/v1/emails/?page=${page}&pageSize=${pageSize}`, method: 'GET', payload: undefined })
		const responseJson = await response.json()

		if (response.statusCode !== 200) {
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
			message: "Could not get emails",
			result: [],
		}
	}
}

export const getEmail = async (id: string): Promise<APIResponse<Email[]>> => {
	try {
		const response = await api_client({ endpoint: `/api/v1/emails/${id}`, method: 'GET', payload: undefined })
		const responseJson = await response.json()

		if (response.statusCode !== 200) {
			return {
				success: true,
				message: responseJson.message,
				result: [],
			}
		}

		return {
			success: false,
			message: responseJson.message,
			result: responseJson.data,
		}

	} catch (e) {
		return {
			success: false,
			message: "Could not get emails",
			result: [],
		}
	}
}
