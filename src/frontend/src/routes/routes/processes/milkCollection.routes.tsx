import type { LoaderFunctionArgs, RouteObject } from "react-router";

import { getPaginatedMilkList } from "../../../features/domain/milk/loaders/listMilk";
import { listProducers } from "../../../features/domain/producer/loaders/listProducers";
import { getMilk } from "../../../features/domain/milk/loaders/getMilk";
import { listStorages } from "../../../features/domain/storage/loaders/listStorages";

import { adaptStoragesToStorageOptions } from "../../../features/domain/storage/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { milkTranslationLoader } from "../../../features/domain/milk/loaders/translation";
import { adaptProducersToProducerOptions } from "../../../features/domain/producer/adapters";
import { withUserGroupPermission } from "../../../shared/loaders/withUserGroupPermission";

const milkCollectionRoutes: RouteObject = {
	id: "milk",
	path: "/",
	loader: milkTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.milkCollection.root.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/milkCollection/milkCollection/MilkCollection"))
						.default,
			},
			loader: withUserGroupPermission(
				async () => adaptProducersToProducerOptions(await listProducers()),
				NAVIGATION_ROUTES.milkCollection.root.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.list.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/listMilkCollection/ListMilkCollection"
						)
					).default,
			},
			loader: withUserGroupPermission(
				getPaginatedMilkList,
				NAVIGATION_ROUTES.milkCollection.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.create.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/editMilkCollection/EditMilkCollection"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async () => ({
					producerOptions: adaptProducersToProducerOptions(await listProducers()),
					storageOptions: adaptStoragesToStorageOptions(await listStorages()),
				}),
				NAVIGATION_ROUTES.milkCollection.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.edit.path + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/editMilkCollection/EditMilkCollection"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					producerOptions: adaptProducersToProducerOptions(await listProducers()),
					storageOptions: adaptStoragesToStorageOptions(await listStorages()),
					selectedItem: (await getMilk(args)) || null,
				}),
				NAVIGATION_ROUTES.milkCollection.edit.requiredRoles
			),
		},
	],
};

export default milkCollectionRoutes;
