import type { LoaderFunctionArgs, RouteObject } from "react-router";

import { getPasteurisation } from "../../../features/domain/pasteurisation/loaders/getPasteurisation";
import { getPaginatedPasteuriationList } from "../../../features/domain/pasteurisation/loaders/listPasteuriations";
import { listStorages } from "../../../features/domain/storage/loaders/listStorages";
import { listPasteurs } from "../../../features/domain/pasteur/loaders/listPasteurs";
import { listProductDefinitions } from "../../../features/domain/productDefinition/loaders/listProductDefinitions";
import { adaptStoragesToStorageOptions } from "../../../features/domain/storage/adapters";
import { adaptProductDefinitionsToProductDefinitionOptions } from "../../../features/domain/productDefinition/adapters";
import { adaptPasteursToPasteurOptions } from "../../../features/domain/pasteur/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { pasterisationTranslationLoader } from "../../../features/domain/pasteurisation/loaders/translation";

const pasteurisationRoutes: RouteObject = {
	id: "pasteurisation",
	path: "/",
	loader: pasterisationTranslationLoader,
	children: [
		{
			index: true,
			path: NAVIGATION_ROUTES.pasteuriation.root,
			lazy: {
				Component: async () =>
					(await import("../../../pages/pasteurisation/pasteurisation/Pasteurisation"))
						.default,
			},
			loader: async () => adaptPasteursToPasteurOptions(await listPasteurs()),
		},
		{
			path: NAVIGATION_ROUTES.pasteuriation.list,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/listPasteurisation/ListPasteurisation"
						)
					).default,
			},
			loader: getPaginatedPasteuriationList,
		},
		{
			path: NAVIGATION_ROUTES.pasteuriation.create,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/editPasteurisation/EditPasteurisation"
						)
					).default,
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
			path: NAVIGATION_ROUTES.pasteuriation.edit + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/editPasteurisation/EditPasteurisation"
						)
					).default,
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
	],
};

export default pasteurisationRoutes;
