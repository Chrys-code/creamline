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
import { withUserGroupPermission } from "../../../shared/loaders/withUserGroupPermission";

const pasteurisationRoutes: RouteObject = {
	id: "pasteurisation",
	path: "/",
	loader: pasterisationTranslationLoader,
	children: [
		{
			index: true,
			path: NAVIGATION_ROUTES.pasteuriation.root.path,
			lazy: {
				Component: async () =>
					(await import("../../../pages/pasteurisation/pasteurisation/Pasteurisation"))
						.default,
			},
			loader: withUserGroupPermission(
				async () => adaptPasteursToPasteurOptions(await listPasteurs()),
				NAVIGATION_ROUTES.pasteuriation.root.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.pasteuriation.list.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/listPasteurisation/ListPasteurisation"
						)
					).default,
			},
			loader: withUserGroupPermission(
				getPaginatedPasteuriationList,
				NAVIGATION_ROUTES.pasteuriation.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.pasteuriation.create.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/editPasteurisation/EditPasteurisation"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async () => ({
					pasteurOptions: adaptPasteursToPasteurOptions(await listPasteurs()),
					storageOptions: adaptStoragesToStorageOptions(await listStorages()),
					productDefinitionOptions: adaptProductDefinitionsToProductDefinitionOptions(
						await listProductDefinitions()
					),
				}),
				NAVIGATION_ROUTES.pasteuriation.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.pasteuriation.edit.path + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/pasteurisation/editPasteurisation/EditPasteurisation"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					pasteurOptions: adaptPasteursToPasteurOptions(await listPasteurs()),
					storageOptions: adaptStoragesToStorageOptions(await listStorages()),
					productDefinitionOptions: adaptProductDefinitionsToProductDefinitionOptions(
						await listProductDefinitions()
					),
					selectedItem: await getPasteurisation(args),
				}),
				NAVIGATION_ROUTES.pasteuriation.edit.requiredRoles
			),
		},
	],
};

export default pasteurisationRoutes;
