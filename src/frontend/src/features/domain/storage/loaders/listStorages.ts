import { storageClient } from "../services/client";

export const listStorages = async () => {
	try {
		const storageResponse = await storageClient.v1_storage_list();
		return storageResponse;
	} catch {
		throw new Error("Could not get storages");
	}
};
