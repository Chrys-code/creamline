import type { LoaderFunctionArgs, RouteObject } from "react-router";

import { getPaginatedMilkList } from "../../../features/domain/milk/loaders/listMilk";
import { listProducers } from "../../../features/domain/producer/loaders/listProducers";
import { getMilk } from "../../../features/domain/milk/loaders/getMilk";
import { listStorages } from "../../../features/domain/storage/loaders/listStorages";

import { adaptProducersToProducerOptions } from "../../../features/domain/milk/adapters";
import { adaptStoragesToStorageOptions } from "../../../features/domain/storage/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { milkTranslationLoader } from "../../../features/domain/milk/loaders/translation";

const milkCollectionRoutes: RouteObject = {
	id: "milk",
	path: "/",
	loader: milkTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.milkCollection.root,
			lazy: {
				Component: async () =>
					(await import("../../../pages/milkCollection/milkCollection/MilkCollection"))
						.default,
			},
			loader: async () => adaptProducersToProducerOptions(await listProducers()),
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.list,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/listMilkCollection/ListMilkCollection"
						)
					).default,
			},
			loader: getPaginatedMilkList,
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.create,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/editMilkCollection/EditMilkCollection"
						)
					).default,
			},
			loader: async () => ({
				producerOptions: adaptProducersToProducerOptions(await listProducers()),
				storageOptions: adaptStoragesToStorageOptions(await listStorages()),
			}),
		},
		{
			path: NAVIGATION_ROUTES.milkCollection.edit + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/milkCollection/editMilkCollection/EditMilkCollection"
						)
					).default,
			},
			loader: async (args: LoaderFunctionArgs) => ({
				producerOptions: adaptProducersToProducerOptions(await listProducers()),
				storageOptions: adaptStoragesToStorageOptions(await listStorages()),
				selectedItem: (await getMilk(args)) || null,
			}),
		},
	],
};

export default milkCollectionRoutes;
