import type { PaginatedPasteurList } from "../../../features/domain/pasteur/types";

export interface ListPasteursProps {
	data: {
		data: PaginatedPasteurList;
		page: number;
	};
}
