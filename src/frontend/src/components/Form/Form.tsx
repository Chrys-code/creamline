import type { FormProps } from './Form.types.ts';

import styles from './Form.module.scss';


const Form: React.FC<FormProps> = ({ title, children, actionElements, onSubmit }: FormProps) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		onSubmit(e);
	}

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			{title && <h1>{title}</h1>}
			{children}
			<div className={styles.formActions}>
				{actionElements}
			</div>
		</form>
	)
}

export default Form