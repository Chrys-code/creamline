import type React from "react";
import type { FormProps } from "./Form.types";

import styles from "./Form.module.scss";

const Form: React.FC<FormProps> = ({
	title,
	children,
	actionElements,
	onSubmit,
	type = "fullPage",
}: FormProps) => {
	const formActionsStyle =
		type === "fullPage" ? styles.fullPageFormActions : styles.dialogFormActions;

	return (
		<form className={styles.container} onSubmit={onSubmit}>
			{title && <h1>{title}</h1>}
			{children}
			<div className={formActionsStyle}>{actionElements}</div>
		</form>
	);
};

export default Form;
