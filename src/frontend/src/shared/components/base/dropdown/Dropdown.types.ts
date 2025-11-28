import type React from "react";

export interface DropdownProps {
	id: string;
	name: string;
	options: { id: string | number; value: string }[];

	placeholder: string;
	label?: string;
	info?: string;
	error?: string | null;
	disabled?: boolean;
	defaultValue?: string;

	onChange?: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}
