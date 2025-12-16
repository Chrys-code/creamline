import type { LoaderFunctionArgs } from "react-router";
import { userClient } from "../services/client";

const getPaginatedUserList = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const userResponse = await userClient.getPaginatedUsersList({
			queries: { page, page_size },
		});

		return { data: userResponse, page };
	} catch {
		throw new Error("Could not load users");
	}
};

export default getPaginatedUserList;
