import type { PaginatedPasteurisationListSchema } from "@/features/domain/pasteurisation/types";

export interface ListPasteurisationProps {
	data: PaginatedPasteurisationListSchema;
	page: number;
}
