import { storageClient } from "../services/client";

export const listStorageTypes = async () => {
	try {
		const storageTypesResponse = await storageClient.getStorageTypes();
		return storageTypesResponse;
	} catch {
		throw new Error("Failed to load storage types");
	}
};
