import type { PaginatedProducerList } from "../../../features/domain/producer/types";

export interface ListProducersProps {
	data: {
		data: PaginatedProducerList;
		page: number;
	};
}
