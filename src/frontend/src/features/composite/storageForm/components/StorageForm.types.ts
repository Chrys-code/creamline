import type { Storage } from "../../../domain/storage/types";

export interface StorageFormProps {
	storage: Storage | null;
	storageTypeOptions: { id: string; value: string }[];
}
