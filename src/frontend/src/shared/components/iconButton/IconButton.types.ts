import type React from "react";

export interface IconButtonProps {
	style?: "primary" | "secondary";
	type?: "button" | "submit";
	disabled?: boolean;
	children: React.ReactNode;
	onClick: (_e: React.MouseEvent<HTMLButtonElement>) => void;
}
