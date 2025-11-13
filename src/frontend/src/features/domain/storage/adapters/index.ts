import type { Storage } from "../types";

export const adaptStoragesToStorageOptions = (storages: Storage[]) =>
	storages?.map((storage) => ({
		id: storage.uuid,
		value: storage.name,
	})) || [];
