import type { DropdownProps } from './Dropdown.types.ts'
import styles from './Dropdown.module.scss';


const Dropdown: React.FC<DropdownProps> = ({ id, options, info, label, error, disabled, placeholder, defaultValue = "init", ...props}: DropdownProps) => {
	const inputStyle = `${styles.input} ${error && styles.error} ${disabled && styles.disabled}`;

	return (
		<div className={styles.container}>
			{label &&
				<div>
					<label htmlFor={id}>{label}</label>
					{info && <span>{info}</span>}
				</div>
			}
			<select className={inputStyle} id={id} {...props} defaultValue={defaultValue} >
				<option value="init" className={styles.initialOption} disabled >{placeholder}</option>
				{options && options.map(option => <option key={option.id} value={option.id}>{option.value}</option>)}
			</select>
			{error && <span>{error}</span>}
		</div>
	)
}

export default Dropdown