import type { InputFieldProps } from './InputField.types.ts';
import styles from './InputField.module.scss';


const InputField: React.FC<InputFieldProps> = ({ id, type, info, label, defaultValue, placeholder, step, error, disabled, ...props }: InputFieldProps) => {

    const inputStyle = `${styles.input} ${error && styles.error} ${disabled && styles.disabled}`;
    const numberInputStep = Boolean(type == "number" && step) ? step : undefined;

    return (
        <div className={styles.container}>
            {label &&
                <div>
                    <label htmlFor={id}>{label}</label>
                    {info && <span>{info}</span>}
                </div>
            }
            <input className={inputStyle} id={id} {...props} type={type} defaultValue={defaultValue} step={numberInputStep} placeholder={placeholder} autoComplete='off' />
            {error && <span>{error}</span>}
        </div>
    )
}

export default InputField