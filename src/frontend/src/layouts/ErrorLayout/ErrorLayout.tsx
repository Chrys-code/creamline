import Button from '../../components/Button';
import styles from './ErrorLayout.module.scss';

import { useNavigate } from 'react-router';

const ErrorLayout: React.FC = () => {
	const navigate = useNavigate();

	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<h1>Sajnos valami hiba történt...</h1>
			<p>Ha a hiba továbbra is fennáll, kérjük jelezze az adminisztrátorok felé!</p>
			<Button type='primary' onClick={() => navigate("/")}>Vissza a főoldalra</Button>
		</form>
	)
}

export default ErrorLayout