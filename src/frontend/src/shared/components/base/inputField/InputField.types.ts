import type React from "react";

export interface InputFieldProps {
	id: string;
	name: string;

	type: InputFieldTypes;

	label?: string;
	info?: string;
	defaultValue?: string;
	placeholder?: string;
	error?: string | null;
	disabled?: boolean;
	readOnly?: boolean;

	step?: string; // only for number type

	onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
}

type InputFieldTypes =
	| "datetime-local"
	| "email"
	| "number"
	| "password"
	| "range"
	| "text"
	| "time"
	| "date"
	| "month"
	| "week"
	| "hidden";
