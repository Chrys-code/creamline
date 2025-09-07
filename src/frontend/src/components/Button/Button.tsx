import type { ButtonProps } from './Button.types.ts'

import styles from './Button.module.scss';


const Button: React.FC<ButtonProps> = ({ type = "primary", disabled, children, onClick }: ButtonProps) => {
	if (type == "primary") {
		const primaryStyle = `${styles.primary} ${disabled && styles.disabled}`
		return (
			<button className={primaryStyle} disabled={disabled} onClick={onClick && onClick}>
				{children}
			</button>
		)
	}

	const secondaryStyle = `${styles.secondary} ${disabled && styles.disabled}`

	return (
		<button className={secondaryStyle} disabled={disabled} onClick={onClick && onClick}>
			{children}
		</button>
	)
}

export default Button