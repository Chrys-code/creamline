import type React from "react";

export interface PaginatedListProps<T> {
	items: T[];
	itemCount: number;
	currentPage: number;
	nextPage: string | null | undefined;
	previousPage: string | null | undefined;
	itemRenderer: (_item: T) => React.ReactNode;
}
