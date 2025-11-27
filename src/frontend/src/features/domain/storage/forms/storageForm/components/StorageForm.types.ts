import type { Storage } from "../../../types";

export interface StorageFormProps {
	storage: Storage | null;
	storageTypeOptions: { id: string; value: string }[];
}
