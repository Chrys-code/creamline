import type { LoaderFunctionArgs } from "react-router";
import requireUser from "../loaders/requireUser";
import requirePaginatedUserList from "../loaders/requireUsers";

const userManagementRoutes = [
	{
		path: "users",
		lazy: {
			Component: async () => (await import("../../pages/user/userList/UserList")).default,
		},
		loader: requirePaginatedUserList,
	},
	{
		path: "users/create",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async () => ({
			selectedItem: null,
		}),
	},
	{
		path: "users/edit/:id",
		lazy: {
			Component: async () => (await import("../../pages/user/editUser/EditUser")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			selectedItem: await requireUser(args),
		}),
	},
];

export default userManagementRoutes;
