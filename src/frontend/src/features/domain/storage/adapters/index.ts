import type { Storage } from "../types";

export const adaptStoragesToStorageOptions = (storages: Storage[]) =>
	storages?.map((storage) => ({
		id: storage.uuid,
		value: storage.name,
	})) || [];

export const adaptStorageToEditorForm = (storage: Storage | null) => {
	if (!storage) return null;

	return {
		name: storage.name,
		uuid: storage.uuid,
		type: storage.type_uuid,
		created_at: storage.created_at,
		updated_at: storage.updated_at,
	};
};
