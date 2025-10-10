import type React from "react";
import type { FormProps } from "./Form.types.ts";

import styles from "./Form.module.scss";

const Form: React.FC<FormProps> = ({ title, children, actionElements, onSubmit }: FormProps) => {
	return (
		<form className={styles.container} onSubmit={onSubmit}>
			{title && <h1>{title}</h1>}
			{children}
			<div className={styles.formActions}>{actionElements}</div>
		</form>
	);
};

export default Form;
