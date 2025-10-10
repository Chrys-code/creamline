import type React from "react";

export interface AppLayoutProps {
	type?: "mobile" | "desktop";
	children?: React.ReactNode;
}
