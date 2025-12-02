import { storageClient } from "../services/client";

export const listStorageTypes = async () => {
	try {
		const storageTypesResponse = await storageClient.v1_storage_types_retrieve();
		return storageTypesResponse;
	} catch {
		throw new Error("Failed to load storage types");
	}
};
