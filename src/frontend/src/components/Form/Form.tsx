import type { FormProps } from './Form.types.ts';

import styles from './Form.module.scss';


const Form: React.FC<FormProps> = ({ children, onSubmit }: FormProps) => {
	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		onSubmit(e);
	}

	return (
		<form className={styles.container} onSubmit={handleSubmit}>{children}</form>
	)
}

export default Form