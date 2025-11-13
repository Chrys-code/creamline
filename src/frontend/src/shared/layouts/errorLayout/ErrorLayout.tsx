import type React from "react";
import styles from "./ErrorLayout.module.scss";

import Button from "../../components/button";

import { useNavigate, useRouteError } from "react-router";

const ErrorLayout: React.FC = () => {
	const error = useRouteError() as any;
	const navigate = useNavigate();

	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<h1>Sajnos valami hiba történt...</h1>
			<p>{error?.data?.message || error?.message}</p>
			<p>Ha a hiba továbbra is fennáll, kérjük jelezze az adminisztrátorok felé!</p>
			<Button style="primary" type="submit" onClick={() => navigate("/")}>
				Vissza a főoldalra
			</Button>
		</form>
	);
};

export default ErrorLayout;
