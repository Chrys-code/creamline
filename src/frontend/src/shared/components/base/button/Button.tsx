import type React from "react";
import type { ActionType, ButtonProps } from "./Button.types";

import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({
	style = "primary",
	type = "button",
	actionType,
	disabled,
	children,
	onClick,
}: ButtonProps) => {
	const getActionStyle = (actionType: ActionType) => {
		switch (actionType) {
			case "positive":
				return styles.positive;
			case "negative":
				return styles.negative;
			default:
				return "";
		}
	};

	if (style === "primary") {
		const primaryStyle = `${styles.primary} ${disabled ? styles.disabled : ""}`;

		return (
			<button
				type={type}
				className={primaryStyle}
				disabled={disabled}
				onClick={onClick && onClick}
			>
				{children}
			</button>
		);
	}

	const secondaryStyle = `${styles.secondary} ${disabled ? styles.disabled : ""} ${getActionStyle(actionType)}`;
	return (
		<button
			type={type}
			className={secondaryStyle}
			disabled={disabled}
			onClick={onClick && onClick}
		>
			{children}
		</button>
	);
};

export default Button;
