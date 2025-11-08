import type { LoaderFunctionArgs } from "react-router";
import requireUser from "../loaders/requireUser";
import requirePaginatedUserList from "../loaders/requireUsers";
import requireUserGroups from "../loaders/requireUserGroups";
import { adaptUserGroupsForOptions } from "../../adapters/userGroupAdapter/userGroupAdapter";

const userManagementRoutes = [
	{
		path: "users",
		lazy: {
			Component: async () => (await import("../../pages/user/userList/UserList")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await requirePaginatedUserList(args),
			userGroups: await requireUserGroups(),
		}),
	},
	{
		path: "users/create",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async () => ({
			selectedItem: null,
			userGroups: await requireUserGroups(),
		}),
	},
	{
		path: "users/edit/:id",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			selectedItem: await requireUser(args),
			userGroups: adaptUserGroupsForOptions(await requireUserGroups()),
		}),
	},
];

export default userManagementRoutes;
