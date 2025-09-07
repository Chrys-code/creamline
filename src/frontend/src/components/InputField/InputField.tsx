import type { InputFieldProps } from './InputField.types.ts';
import styles from './InputField.module.scss';


const InputField: React.FC<InputFieldProps> = ({ id, name, type, info, label, error, onChange }: InputFieldProps) => {

    return (
        <div className={styles.container}>
            {label &&
                <div>
                    <label htmlFor={id}>{label}</label>
                    {info && <span>{info}</span>}
                </div>
            }
            <input id={id} name={name} type={type} autoComplete='off' onChange={onChange && onChange} />
            {error && <span>{error}</span>}
        </div>
    )
}

export default InputField