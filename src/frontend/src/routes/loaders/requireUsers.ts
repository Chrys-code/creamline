import type { LoaderFunctionArgs } from "react-router";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const requirePaginatedUserList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const userResponse = await api.get("/api/v1/users/", { queries: { page, page_size } });
		const data = schemas.ListUserSchema.parse(userResponse);

		return { data, page };
	} catch {
		throw new Error();
	}
};

export default requirePaginatedUserList;
