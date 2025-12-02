import type { Storage, StorageType } from "../types";

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
		type: storage.type,
		created_at: storage.created_at,
		updated_at: storage.updated_at,
	};
};

export const adaptStorageTypesForStorageTypeOptions = (storageTypes: StorageType[]) => {
	if (!storageTypes) return [];
	if (!Array.isArray(storageTypes) || !storageTypes.length) return [];

	const adaptedStorageTypes = storageTypes.map((storageType) => {
		return {
			id: storageType.value,
			value: storageType.label,
		};
	});

	return adaptedStorageTypes;
};
