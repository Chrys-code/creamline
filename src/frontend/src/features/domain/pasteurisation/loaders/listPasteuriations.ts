import type { LoaderFunctionArgs } from "react-router";
import pasteurisationClient from "../services/client";

export const getPaginatedPasteuriationList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const pasteurisedMilkResponse = await pasteurisationClient.getPasteurisationList({
			queries: { page, page_size },
		});

		return { data: pasteurisedMilkResponse, page };
	} catch {
		throw new Error("Could not get pasteurisations");
	}
};
