import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { NAVIGATION_ROUTES } from "../../configs/navigation";

import { getUser } from "../../features/domain/user/loaders/getUser";
import { listUserGroups } from "../../features/domain/user/features/userGroups/loaders/listUserGroups";
import { userTranslationLoader } from "../../features/domain/user/loaders/translation";
import getPaginatedUserList from "../../features/domain/user/loaders/listUsers";

import { adaptUserGroupsForUserGroupOptions } from "../../features/domain/user/features/userGroups/adapters";
import { withUserGroupPermission } from "../../shared/loaders/withUserGroupPermission";

const userManagementRoutes: RouteObject = {
	id: "user",
	path: "/",
	loader: userTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.user.list.path,
			lazy: {
				Component: async () => (await import("../../pages/user/listUser/ListUser")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					data: await getPaginatedUserList(args),
					userGroups: await listUserGroups(),
				}),
				NAVIGATION_ROUTES.user.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.user.create.path,
			lazy: {
				Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
			},
			loader: withUserGroupPermission(
				async () => ({
					selectedItem: null,
					userGroups: adaptUserGroupsForUserGroupOptions(await listUserGroups()),
				}),
				NAVIGATION_ROUTES.user.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.user.edit.path + ":id",
			lazy: {
				Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					selectedItem: await getUser(args),
					userGroups: adaptUserGroupsForUserGroupOptions(await listUserGroups()),
				}),
				NAVIGATION_ROUTES.user.edit.requiredRoles
			),
		},
	],
};

export default userManagementRoutes;
