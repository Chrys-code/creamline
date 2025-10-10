import type React from "react";

export interface AuthLayoutProps {
	type?: "desktop" | "mobile";
	children: React.ReactNode;
}
