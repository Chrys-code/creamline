import type { LoaderFunctionArgs, RouteObject } from "react-router";
import getPaginatedUserList from "../../features/domain/user/loaders/listUsers";
import { getUser } from "../../features/domain/user/loaders/getUser";
import { listUserGroups } from "../../features/domain/user/features/userGroups/loaders/listUserGroups";
import { adaptUserGroupsForUserGroupOptions } from "../../features/domain/user/features/userGroups/adapters";
import { NAVIGATION_ROUTES } from "../../configs/navigation";
import { userTranslationLoader } from "../../features/domain/user/loaders/translation";

const userManagementRoutes: RouteObject = {
	id: "user",
	path: "/",
	loader: userTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.user.list,
			lazy: {
				Component: async () => (await import("../../pages/user/listUser/ListUser")).default,
			},
			loader: async (args: LoaderFunctionArgs) => ({
				data: await getPaginatedUserList(args),
				userGroups: await listUserGroups(),
			}),
		},
		{
			path: NAVIGATION_ROUTES.user.create,
			lazy: {
				Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
			},
			loader: async () => ({
				selectedItem: null,
				userGroups: adaptUserGroupsForUserGroupOptions(await listUserGroups()),
			}),
		},
		{
			path: NAVIGATION_ROUTES.user.edit + ":id",
			lazy: {
				Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
			},
			loader: async (args: LoaderFunctionArgs) => ({
				selectedItem: await getUser(args),
				userGroups: adaptUserGroupsForUserGroupOptions(await listUserGroups()),
			}),
		},
	],
};

export default userManagementRoutes;
