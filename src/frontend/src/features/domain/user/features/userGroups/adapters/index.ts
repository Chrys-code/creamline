import { commonTranslations, tTyped } from "../../../../../../configs/i18n";
import type { UserGroup } from "../types";

const tCommon = tTyped("common");

export const adaptUserGroupsForUserGroupOptions = (userGroups: UserGroup[]) => {
	if (!userGroups) return [];
	if (!Array.isArray(userGroups) || !userGroups.length) return [];

	const groups = userGroups.map((group) => {
		const code_name = group.name as keyof typeof commonTranslations.user_groups;
		return {
			id: group.id,
			value: tCommon(`user_groups.${code_name}`),
		};
	});

	return groups;
};

export const adaptUserGroupsForTranslatedNames = (userGroups: UserGroup[]) => {
	if (!userGroups) return [];
	if (!Array.isArray(userGroups) || !userGroups.length) return [];

	const groups = userGroups.map((group) => {
		const code_name = group.name as keyof typeof commonTranslations.user_groups;
		return {
			id: group.id,
			name: tCommon(`user_groups.${code_name}`),
		};
	});

	return groups;
};
