import type { LoaderFunctionArgs } from "react-router";

import { getPaginatedMilkList } from "../../features/domain/milk/loaders/listMilk";
import { listProducers } from "../../features/domain/producer/loaders/listProducers";
import { getMilk } from "../../features/domain/milk/loaders/getMilk";
import { listStorages } from "../../features/domain/storage/loaders/listStorages";

import { adaptProducersToProducerOptions } from "../../features/domain/milk/adapters";
import { adaptStoragesToStorageOptions } from "../../features/domain/storage/adapters";

const milkCollectionRoutes = [
	{
		path: "milk-collection",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/listMilkCollection/ListMilkCollection"))
					.default,
		},
		loader: getPaginatedMilkList,
	},
	{
		path: "milk-collection/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/editMilkCollection/EditMilkCollection"))
					.default,
		},
		loader: async () => ({
			producerOptions: adaptProducersToProducerOptions(await listProducers()),
			storageOptions: adaptStoragesToStorageOptions(await listStorages()),
		}),
	},
	{
		path: "milk-collection/edit/:id",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/editMilkCollection/EditMilkCollection"))
					.default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			producerOptions: adaptProducersToProducerOptions(await listProducers()),
			storageOptions: adaptStoragesToStorageOptions(await listStorages()),
			selectedItem: (await getMilk(args)) || null,
		}),
	},
	{
		path: "milk-collection-analytics",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/milkCollection/MilkCollection")).default,
		},
		loader: getPaginatedMilkList,
	},
];

export default milkCollectionRoutes;
