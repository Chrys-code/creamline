import type { LoaderFunctionArgs } from "react-router";
import { producerClient } from "../services/client";

export const listPaginatedProducers = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const producerResponse = await producerClient.v1_producer_list_paginated({
			queries: { page, page_size },
		});

		return { data: producerResponse, page };
	} catch (err: any) {
		if (err.response) {
			const status = err.response.status || 500;
			const statusText = err.response.statusText || "Unknown error";
			const body = err.response.data ? JSON.stringify(err.response.data) : null;

			throw new Response(body, { status, statusText });
		}

		throw new Response("Could not get producers list", { status: 500 });
	}
};

export const listProducers = async () => {
	try {
		const producerResponse = await producerClient.v1_producer_list();
		return producerResponse;
	} catch (err: any) {
		if (err.response) {
			const status = err.response.status || 500;
			const statusText = err.response.detail || "Unknown error";
			const body = err.response.data ? JSON.stringify(err.response.data) : null;

			throw new Response(body, { status, statusText });
		}

		throw new Response("Could not get producers", { status: 500 });
	}
};
