import type { LoaderFunctionArgs } from "react-router";

import { getPasteurisation } from "../../features/domain/pasteurisation/loaders/getPasteurisation";
import { getPaginatedPasteuriationList } from "../../features/domain/pasteurisation/loaders/listPasteuriations";
import { listStorages } from "../../features/domain/storage/loaders/listStorages";
import { listPasteurs } from "../../features/domain/pasteur/loaders/listPasteurs";
import { listProductDefinitions } from "../../features/domain/productDefinition/loaders/listProductDefinitions";
import { adaptPasteursToPasteurOptions } from "../../features/domain/pasteurisation/adapters";
import { adaptStoragesToStorageOptions } from "../../features/domain/storage/adapters";
import { adaptProductDefinitionsToProductDefinitionOptions } from "../../features/domain/productDefinition/adapters";

const pasteurisationRoutes = [
	{
		path: "pasteurised-milk",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteurisation/listPasteurisation/ListPasteurisation"))
					.default,
		},
		loader: getPaginatedPasteuriationList,
	},
	{
		path: "pasteurised-milk/create",
		lazy: {
			Component: async () =>
				(await import("../../pages/pasteurisation/editPasteurisation/EditPasteurisation"))
					.default,
		},
		loader: async () => ({
			pasteurOptions: adaptPasteursToPasteurOptions(await listPasteurs()),
			storageOptions: adaptStoragesToStorageOptions(await listStorages()),
			productDefinitionOptions: adaptProductDefinitionsToProductDefinitionOptions(
				await listProductDefinitions()
			),
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
			pasteurOptions: adaptPasteursToPasteurOptions(await listPasteurs()),
			storageOptions: adaptStoragesToStorageOptions(await listStorages()),
			productDefinitionOptions: adaptProductDefinitionsToProductDefinitionOptions(
				await listProductDefinitions()
			),
			selectedItem: await getPasteurisation(args),
		}),
	},
];

export default pasteurisationRoutes;
