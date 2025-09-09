import type { IconButtonProps } from './IconButton.types.ts'

import styles from './IconButton.module.scss';


const IconButton: React.FC<IconButtonProps> = ({ style = "primary", children, type = "button", disabled }: IconButtonProps) => {
	const secondaryStyle = `${styles.secondary} ${disabled && styles.disabled}`
	if (style == "secondary") {
		return (
			<button type={type} className={secondaryStyle}>{children}</button>
		)
	}

	const primaryStyle = `${styles.primary} ${disabled && styles.disabled}`
	return (
		<button type={type} className={primaryStyle}>{children}</button>
	)
}

export default IconButton