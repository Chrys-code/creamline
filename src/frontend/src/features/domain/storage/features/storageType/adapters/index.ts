import type { StorageType } from "../types";

export const adaptStorageTypesForStorageTypeOptions = (storageTypes: StorageType[]) => {
	if (!storageTypes) return [];
	if (!Array.isArray(storageTypes) || !storageTypes.length) return [];

	const adaptedStorageTypes = storageTypes.map((storageType) => {
		return {
			id: storageType.uuid,
			value: storageType.name,
		};
	});

	return adaptedStorageTypes;
};
