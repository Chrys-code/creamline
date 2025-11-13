import type { LoaderFunctionArgs } from "react-router";
import getPaginatedUserList from "../../features/domain/user/loaders/listUsers";
import { getUser } from "../../features/domain/user/loaders/getUser";
import { listUserGroups } from "../../features/domain/userGroups/loaders/listUserGroups";
import { adaptUserGroupsForUserGroupOptions } from "../../features/domain/userGroups/adapters";

const userManagementRoutes = [
	{
		path: "users",
		lazy: {
			Component: async () => (await import("../../pages/user/userList/UserList")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await getPaginatedUserList(args),
			userGroups: await listUserGroups(),
		}),
	},
	{
		path: "users/create",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async () => ({
			selectedItem: null,
			userGroups: await listUserGroups(),
		}),
	},
	{
		path: "users/edit/:id",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			selectedItem: await getUser(args),
			userGroups: adaptUserGroupsForUserGroupOptions(await listUserGroups()),
		}),
	},
];

export default userManagementRoutes;
