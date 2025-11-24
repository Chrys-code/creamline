import { storageTypeClient } from "../services/client";

export const listStorageTypes = async () => {
	try {
		const storageTypesResponse = await storageTypeClient.get_storage_types();
		return storageTypesResponse;
	} catch {
		throw new Error("Failed to load storage types");
	}
};
