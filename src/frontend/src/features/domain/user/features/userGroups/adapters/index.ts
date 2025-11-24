import type { UserGroup } from "../types";

export const adaptUserGroupsForUserGroupOptions = (userGroups: UserGroup[]) => {
	if (!userGroups) return [];
	if (!Array.isArray(userGroups) || !userGroups.length) return [];

	const groups = userGroups.map((group) => {
		return {
			id: group.id,
			value: group.name,
		};
	});

	return groups;
};
