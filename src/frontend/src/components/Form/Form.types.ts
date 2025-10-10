import type React from "react";

export interface FormProps {
	title?: string;
	children: React.ReactNode;
	actionElements: React.ReactNode;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}
