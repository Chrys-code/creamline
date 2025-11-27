import type { LoaderFunctionArgs } from "react-router";
import { listPaginatedProductDefinitions } from "../../features/domain/productDefinition/loaders/listProductDefinitions";
import { getProductDefinition } from "../../features/domain/productDefinition/loaders/getProductDefinition";
import { getProductDefinitionOptions } from "../../features/domain/productDefinition/loaders/getProductDefinitionOptions";
import { adaptProductDefinitionsOptionsToProductDefinitionOptions } from "../../features/domain/productDefinition/adapters";

const productDefinitionRoutes = [
	{
		path: "product-definition",
		lazy: {
			Component: async () =>
				(
					await import(
						"../../pages/productDefinition/listProductDefinitions/ListProductDefinitions"
					)
				).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			data: await listPaginatedProductDefinitions(args),
		}),
	},
	{
		path: "product-definition/create",
		lazy: {
			Component: async () =>
				(
					await import(
						"../../pages/productDefinition/editProductDefinition/EditProductDefinition"
					)
				).default,
		},
		loader: async () => ({
			productDefinition: null,
			productDefinitionTypeOptions: adaptProductDefinitionsOptionsToProductDefinitionOptions(
				await getProductDefinitionOptions()
			),
		}),
	},
	{
		path: "product-definition/edit/:id",
		lazy: {
			Component: async () =>
				(
					await import(
						"../../pages/productDefinition/editProductDefinition/EditProductDefinition"
					)
				).default,
		},
		loader: async (args: LoaderFunctionArgs) => ({
			productDefinition: await getProductDefinition(args),
			productDefinitionTypeOptions: adaptProductDefinitionsOptionsToProductDefinitionOptions(
				await getProductDefinitionOptions()
			),
		}),
	},
];

export default productDefinitionRoutes;
