import { tTyped } from "@/configs/i18n";

import { userGroupClient } from "../services/client";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const listUserGroups = async () => {
	try {
		const userGroupsResponse = await userGroupClient.getUserGroups();
		return userGroupsResponse;
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}

		throw new Error("Failed to load user groups");
	}
};
