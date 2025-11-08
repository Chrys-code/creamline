import z from "zod";
import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requireUserGroups = async () => {
	try {
		const UserGroupListSchema = z.array(schemas.UserGroupBaseSchema);
		const userGroupsResponse = await api.get_user_groups();
		const parsed = UserGroupListSchema.parse(userGroupsResponse);
		return parsed;
	} catch {
		throw new Error("Failed to load user groups");
	}
};

export default requireUserGroups;
