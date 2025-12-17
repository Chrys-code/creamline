import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedProductDefinitions } from "../../../features/domain/productDefinition/loaders/listProductDefinitions";
import { getProductDefinition } from "../../../features/domain/productDefinition/loaders/getProductDefinition";
import { getProductDefinitionOptions } from "../../../features/domain/productDefinition/loaders/getProductDefinitionOptions";
import { adaptProductDefinitionsOptionsToProductDefinitionOptions } from "../../../features/domain/productDefinition/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { productDefinitionTranslationLoader } from "../../../features/domain/productDefinition/loaders/translation";
import { withUserGroupPermission } from "../../../shared/loaders/withUserGroupPermission";

const productDefinitionRoutes: RouteObject = {
	id: "productDefinition",
	path: "/",
	loader: productDefinitionTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.productDefinition.list.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/listProductDefinitions/ListProductDefinitions"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					data: await listPaginatedProductDefinitions(args),
				}),
				NAVIGATION_ROUTES.productDefinition.list.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.productDefinition.create.path,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/editProductDefinition/EditProductDefinition"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async () => ({
					productDefinition: null,
					productDefinitionTypeOptions:
						adaptProductDefinitionsOptionsToProductDefinitionOptions(
							await getProductDefinitionOptions()
						),
				}),
				NAVIGATION_ROUTES.productDefinition.create.requiredRoles
			),
		},
		{
			path: NAVIGATION_ROUTES.productDefinition.edit.path + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/editProductDefinition/EditProductDefinition"
						)
					).default,
			},
			loader: withUserGroupPermission(
				async (args: LoaderFunctionArgs) => ({
					productDefinition: await getProductDefinition(args),
					productDefinitionTypeOptions:
						adaptProductDefinitionsOptionsToProductDefinitionOptions(
							await getProductDefinitionOptions()
						),
				}),
				NAVIGATION_ROUTES.productDefinition.edit.requiredRoles
			),
		},
	],
};

export default productDefinitionRoutes;
