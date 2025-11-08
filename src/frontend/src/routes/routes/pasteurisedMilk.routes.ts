import type { LoaderFunctionArgs } from "react-router";

import requirePaginatedPasteurisedMilkList from "../loaders/requirePaginatedPasteurisedMilkList";
import requirePasteurisedMilk from "../loaders/requirePasteurisedMilk";
import requirePasteurs from "../loaders/requirePasteurs";
import requireProductDefinitions from "../loaders/requireProductDefinitions";
import requireStorages from "../loaders/requireStorages";

const pasteurisedMilkRoutes = [
	{
		path: "pasteurised-milk",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteurisation/listPasteurisation/ListPasteurisation"))
					.default,
		},
		loader: requirePaginatedPasteurisedMilkList,
	},
	{
		path: "pasteurised-milk/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteurisation/editPasteurisation/EditPasteurisation"))
					.default,
		},
		loader: async () => ({
			pasteurs: (await requirePasteurs()) || [],
			storages: (await requireStorages()) || [],
			productDefinitions: (await requireProductDefinitions()) || [],
		}),
	},
	{
		path: "pasteurised-milk/edit/:id",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteurisation/editPasteurisation/EditPasteurisation"))
					.default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			pasteurs: (await requirePasteurs()) || [],
			storages: (await requireStorages()) || [],
			productDefinitions: (await requireProductDefinitions()) || [],
			selectedItem: (await requirePasteurisedMilk(args)) || null,
		}),
	},
];

export default pasteurisedMilkRoutes;
