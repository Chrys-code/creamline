import type React from "react";

export interface DialogProps {
	title: string;
	isOpen?: boolean;
	onClose: () => void;
	width?: number | `${number}rem`;
	children: React.ReactNode;
}
