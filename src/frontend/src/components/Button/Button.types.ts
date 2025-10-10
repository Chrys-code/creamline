import type React from "react";

export interface ButtonProps {
	type: "submit" | "button";
	style?: ButtonStyle;
	disabled?: boolean;
	children?: React.ReactNode;
	onClick?: (_e: React.MouseEvent) => void;
}

type ButtonStyle = "primary" | "secondary";
