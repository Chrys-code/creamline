import type { LoaderFunctionArgs } from "react-router";
import { storageClient } from "../services/client";
import type { Storage } from "../types";

export const getStorage = async ({ params }: LoaderFunctionArgs): Promise<Storage | null> => {
	try {
		const { id } = params;
		if (!id) return null;

		const storageResponse = await storageClient.getStorage({ params: { uuid: id } });

		return storageResponse;
	} catch {
		throw new Error("Failed to load storages");
	}
};
