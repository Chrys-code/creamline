import type { UserGroup } from "../../api/types";

export const adaptUserGroupsForOptions = (userGroups: UserGroup[]) => {
	if (!userGroups) return [];
	if (!Array.isArray(userGroups) || !userGroups.length) return [];

	const groups = userGroups.map((group) => ({ id: group.id, value: group.name }));

	return groups;
};
