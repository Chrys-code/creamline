import type { LoaderFunctionArgs, RouteObject } from "react-router";
import { listPaginatedProductDefinitions } from "../../../features/domain/productDefinition/loaders/listProductDefinitions";
import { getProductDefinition } from "../../../features/domain/productDefinition/loaders/getProductDefinition";
import { getProductDefinitionOptions } from "../../../features/domain/productDefinition/loaders/getProductDefinitionOptions";
import { adaptProductDefinitionsOptionsToProductDefinitionOptions } from "../../../features/domain/productDefinition/adapters";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import { productDefinitionTranslationLoader } from "../../../features/domain/productDefinition/loaders/translation";

const productDefinitionRoutes: RouteObject = {
	id: "productDefinition",
	path: "/",
	loader: productDefinitionTranslationLoader,
	children: [
		{
			path: NAVIGATION_ROUTES.productDefinition.list,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/listProductDefinitions/ListProductDefinitions"
						)
					).default,
			},
			loader: async (args: LoaderFunctionArgs) => ({
				data: await listPaginatedProductDefinitions(args),
			}),
		},
		{
			path: NAVIGATION_ROUTES.productDefinition.create,
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/editProductDefinition/EditProductDefinition"
						)
					).default,
			},
			loader: async () => ({
				productDefinition: null,
				productDefinitionTypeOptions:
					adaptProductDefinitionsOptionsToProductDefinitionOptions(
						await getProductDefinitionOptions()
					),
			}),
		},
		{
			path: NAVIGATION_ROUTES.productDefinition.edit + ":id",
			lazy: {
				Component: async () =>
					(
						await import(
							"../../../pages/productDefinition/editProductDefinition/EditProductDefinition"
						)
					).default,
			},
			loader: async (args: LoaderFunctionArgs) => ({
				productDefinition: await getProductDefinition(args),
				productDefinitionTypeOptions:
					adaptProductDefinitionsOptionsToProductDefinitionOptions(
						await getProductDefinitionOptions()
					),
			}),
		},
	],
};

export default productDefinitionRoutes;
