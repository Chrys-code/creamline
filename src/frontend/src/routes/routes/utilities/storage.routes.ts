import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedStorages } from "../../../features/domain/storage/loaders/listStorages";
import { getStorage } from "../../../features/domain/storage/loaders/getStorage";
import { listStorageTypes } from "../../../features/domain/storage/features/storageType/loaders/listStorageTypes";
import { adaptStorageTypesForStorageTypeOptions } from "../../../features/domain/storage/features/storageType/adapters";
import { adaptStorageToEditorForm } from "../../../features/domain/storage/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const storageRoutes = [
	{
		path: NAVIGATION_ROUTES.storage.list,
		lazy: {
			Component: async () =>
				(await import("../../../pages/storage/listStorages/ListStorages")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedStorages(args),
		}),
	},
	{
		path: NAVIGATION_ROUTES.storage.create,
		lazy: {
			Component: async () =>
				(await import("../../../pages/storage/editStorage/EditStorage")).default,
		},
		loader: async () => ({
			storage: null,
			storageTypeOptions: adaptStorageTypesForStorageTypeOptions(await listStorageTypes()),
		}),
	},
	{
		path: NAVIGATION_ROUTES.storage.edit + ":id",
		lazy: {
			Component: async () =>
				(await import("../../../pages/storage/editStorage/EditStorage")).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			storage: adaptStorageToEditorForm(await getStorage(args)),
			storageTypeOptions: adaptStorageTypesForStorageTypeOptions(await listStorageTypes()),
		}),
	},
];

export default storageRoutes;
