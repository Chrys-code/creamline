import { tTyped } from "@/configs/i18n";

import type { LoaderFunctionArgs } from "react-router";

import pasteurisationClient from "../services/pasteurisationClient";

import { getErrorStatusText } from "@/shared/helpers/getErrorStatusText/getErrorStatusText";

export const getPaginatedPasteuriationList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const pasteurisedMilkResponse = await pasteurisationClient.getPasteurisationList({
			queries: { page, page_size },
		});

		return { data: pasteurisedMilkResponse, page };
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;
			const message =
				status !== 500 ? err.response.data.detail : tNetworkError("error_codes.500");

			const statusText = getErrorStatusText(status);

			throw new Response(message, { status, statusText });
		}
		throw new Error("Could not get pasteurisations");
	}
};
