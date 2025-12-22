import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedStorages } from "@/features/domain/storage/loaders/listStorages";
import { getStorage } from "@/features/domain/storage/loaders/getStorage";
import {
	adaptStorageToEditorForm,
	adaptStorageTypesForStorageTypeOptions,
} from "@/features/domain/storage/adapters/storageAdapters";
import { NAVIGATION_ROUTES } from "@/configs/navigation";
import { listStorageTypes } from "@/features/domain/storage/loaders/getStorageTypes";
import { storageTranslationLoader } from "@/features/domain/storage/loaders/storageTranslation";
import { withUserGroupPermission } from "@/shared/loaders/withUserGroupPermission";

const storageRoutes: RouteObject = {
	id: "storage",
	path: "/",
	loader: storageTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.storage.list.path,
			lazy: {
				Component: async () =>
					(await import("@/pages/storage/listStorages/ListStorages")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					data: await listPaginatedStorages(args),
				}),
				NAVIGATION_ROUTES.storage.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.storage.create.path,
			lazy: {
				Component: async () =>
					(await import("@/pages/storage/editStorage/EditStorage")).default,
			},
			loader: withUserGroupPermission(
				async () => ({
					storage: null,
					storageTypeOptions: adaptStorageTypesForStorageTypeOptions(
						await listStorageTypes()
					),
				}),
				NAVIGATION_ROUTES.storage.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.storage.edit.path + ":id",
			lazy: {
				Component: async () =>
					(await import("@/pages/storage/editStorage/EditStorage")).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					storage: adaptStorageToEditorForm(await getStorage(args)),
					storageTypeOptions: adaptStorageTypesForStorageTypeOptions(
						await listStorageTypes()
					),
				}),
				NAVIGATION_ROUTES.storage.edit.requiredRoles
			),
		},
	],
};

export default storageRoutes;
