import type { Storage, StorageType } from "../types";

/**
 * Used to adapt Storages to generic dropdown options
 * @param storages storages array
 * @returns id, value pairs in array
 */
export const adaptStoragesToStorageOptions = (storages: Storage[]) =>
	storages?.map((storage) => ({
		id: storage.uuid,
		value: storage.name,
	})) || [];

/**
 * Used to adapt Storage to be used in Storage forms
 * Removes type_label from storage
 * @param storages storages array
 * @returns Storage without type_label param
 */
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

/**
 * Used to adapt StorageTypes to generic dropdown options
 * @param storageTypes StorageTypes array
 * @returns id, value pairs in array
 */
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
