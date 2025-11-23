import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedStorages } from "../../features/domain/storage/loaders/listStorages";
import { getStorage } from "../../features/domain/storage/loaders/getStorage";

const storageRoutes = [
	{
		path: "storage",
		lazy: {
			Component: async () =>
				(await import("../../pages/storage/listStorages/ListStorages")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedStorages(args),
		}),
	},
	{
		path: "storage/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/storage/editStorage/EditStorage")).default,
		},
		loader: getStorage,
	},
	{
		path: "storage/edit/:id",
		lazy: {
			Component: async () =>
				(await import("../../pages/storage/editStorage/EditStorage")).default,
		},
		loader: getStorage,
	},
];

export default storageRoutes;
