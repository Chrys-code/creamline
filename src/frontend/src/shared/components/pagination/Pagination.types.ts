import type React from "react";

export interface PaginationProps {
	isFirst?: boolean;
	isLast?: boolean;
	onIncrease: (_e: React.MouseEvent<HTMLButtonElement>) => void;
	onDecrease: (_e: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}
