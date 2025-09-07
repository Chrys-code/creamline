import Button from '../../components/Button';
import styles from './Error.module.scss';

import { useNavigate } from 'react-router';

const Error: React.FC = () => {
	const navigate = useNavigate();

	return (
		<main>
			<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
				<h1>Sajnos valami hiba történt...</h1>
				<p>Ha a hiba továbbra is fennáll, kérjük jelezze az adminisztrátorok felé!</p>
				<Button type='primary' onClick={() => navigate("/")}>Vissza a főoldalra</Button>
			</form>
		</main>
	)
}

export default Error