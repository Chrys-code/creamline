import type { LoaderFunctionArgs } from "react-router";

import requireMilk from "../loaders/requireMilk";
import requirePaginatedMilkList from "../loaders/requirePaginatedMilkList";
import requireProducers from "../loaders/requireProducers";
import requireStorages from "../loaders/requireStorages";

const milkCollectionRoutes = [
	{
		path: "milk-collection",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/listMilkCollection/ListMilkCollection"))
					.default,
		},
		loader: requirePaginatedMilkList,
	},
	{
		path: "milk-collection/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/milkCollection/editMilkCollection/EditMilkCollection"))
					.default,
		},
		loader: async () => ({
			producers: (await requireProducers()) || [],
			storages: (await requireStorages()) || [],
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
			producers: (await requireProducers()) || [],
			storages: (await requireStorages()) || [],
			selectedItem: (await requireMilk(args)) || null,
		}),
	},
];

export default milkCollectionRoutes;
