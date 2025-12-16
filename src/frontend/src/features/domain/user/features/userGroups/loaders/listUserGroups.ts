import { userGroupClient } from "../services/client";

export const listUserGroups = async () => {
	try {
		const userGroupsResponse = await userGroupClient.getUserGroups();
		return userGroupsResponse;
	} catch {
		throw new Error("Failed to load user groups");
	}
};
