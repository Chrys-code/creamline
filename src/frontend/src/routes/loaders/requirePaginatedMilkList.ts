import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";

const requirePaginatedMilkList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const milkResponse = await api.get("/api/v1/milk/", { queries: { page, page_size } });
		const data = schemas.PaginatedMilkListSchema.parse(milkResponse);

		return { data, page };
	} catch {
		throw new Error();
	}
};

export default requirePaginatedMilkList;
