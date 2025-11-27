import type { PaginatedListProductDefinition } from "../../../features/domain/productDefinition/types";

export interface ListProductDefinitionsProps {
	data: {
		data: PaginatedListProductDefinition;
		page: number;
	};
}
