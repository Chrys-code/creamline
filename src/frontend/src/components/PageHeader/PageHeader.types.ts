import type React from "react";

export interface PageHeaderProps {
	title: string;
	onNavigateBack?: () => void;
	actionElement?: React.ReactNode;
}
