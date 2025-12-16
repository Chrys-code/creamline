import type { LoaderFunctionArgs } from "react-router";
import { pasteurClient } from "../services/client";

export const listPaginatedPasteurs = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const pasteurResponse = await pasteurClient.getPaginatedPasteurList({
			queries: { page, page_size },
		});

		return { data: pasteurResponse, page };
	} catch {
		throw new Error("Could not get pasteurs list");
	}
};

export const listPasteurs = async () => {
	try {
		const pasteursResponse = await pasteurClient.getPasteurList();
		return pasteursResponse;
	} catch {
		throw new Error("Could not get pasteurs");
	}
};
