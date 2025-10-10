import type React from "react";
import type { ButtonProps } from "./Button.types.ts";

import styles from "./Button.module.scss";


const Button: React.FC<ButtonProps> = ({ style = "primary", type = "button", disabled, children, onClick }: ButtonProps) => {
	if (style === "primary") {
		const primaryStyle = `${styles.primary} ${disabled && styles.disabled}`;
		return (
			<button type={type} className={primaryStyle} disabled={disabled} onClick={onClick && onClick}>
				{children}
			</button>
		);
	}

	const secondaryStyle = `${styles.secondary} ${disabled && styles.disabled}`;
	return (
		<button type={type} className={secondaryStyle} disabled={disabled} onClick={onClick && onClick}>
			{children}
		</button>
	);
};

export default Button;