import { userGroupClient } from "../services/client";

export const listUserGroups = async () => {
	try {
		const userGroupsResponse = await userGroupClient.get_user_groups();
		return userGroupsResponse;
	} catch {
		throw new Error("Failed to load user groups");
	}
};
