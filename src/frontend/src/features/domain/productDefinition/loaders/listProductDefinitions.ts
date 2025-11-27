import type { LoaderFunctionArgs } from "react-router";
import { productDefinitionClient } from "../services/client";

export const listPaginatedProductDefinitions = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const productDefinitionResponse =
			await productDefinitionClient.v1_product_definition_list_paginated({
				queries: { page, page_size },
			});

		return { data: productDefinitionResponse, page };
	} catch {
		throw new Error("Could not get product definition list");
	}
};

export const listProductDefinitions = async () => {
	try {
		const productDefinitionResponse =
			await productDefinitionClient.v1_product_definition_list();

		return productDefinitionResponse;
	} catch {
		throw new Error("Could not get product definitions");
	}
};
