import type { LoaderFunctionArgs } from "react-router";
import { storageClient } from "../services/client";

export const listPaginatedStorages = async ({ request }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const page_size = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 0;

		const storageResponse = await storageClient.getPaginatedStorageList({
			queries: { page, page_size },
		});

		return { data: storageResponse, page };
	} catch {
		throw new Error("Could not get storage list");
	}
};

export const listStorages = async () => {
	try {
		const storageResponse = await storageClient.getStorageList();
		return storageResponse;
	} catch {
		throw new Error("Could not get storages");
	}
};
