import type { PaginatedStorageList } from "../../../features/domain/storage/types";

export interface ListStoragesProps {
	data: {
		data: PaginatedStorageList;
		page: number;
	};
}
