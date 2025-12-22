import type { PaginatedMilkListSchema } from "@/features/domain/milk/types";

export interface ListMilkCollectionProps {
	data: PaginatedMilkListSchema;
	page: number;
}
