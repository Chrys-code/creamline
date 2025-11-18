import type { LoaderFunctionArgs } from "react-router";
import { milkClient } from "../services/client";

export const getPaginatedMilkList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const milkResponse = await milkClient.v1_milk_list_paginated({
			queries: { page, page_size },
		});

		return { data: milkResponse, page };
	} catch {
		throw new Error("Could not get milk list");
	}
};
