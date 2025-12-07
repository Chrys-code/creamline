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
	} catch (err: any) {
		if (err.response) {
			const status = err.response.status || 500;
			const statusText = err.response.statusText || "Unknown error";
			const body = err.response.data ? JSON.stringify(err.response.data) : null;

			throw new Response(body, { status, statusText });
		}

		throw new Response("Could not get milk list", { status: 500 });
	}
};
