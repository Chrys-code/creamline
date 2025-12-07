import type React from "react";
import styles from "./ErrorLayout.module.scss";

import Button from "../../components/base/button";

import { useNavigate, useRouteError } from "react-router";

const ErrorLayout: React.FC = () => {
	const error = useRouteError() as any;
	const navigate = useNavigate();

	// const getErrorMessage = (error) => {
	// 	if (error! instanceof Response) return;

	// 	switch (error.status) {
	// 		case 404:
	// 			return <p>Page not found</p>;
	// 		case 403:
	// 			return <p>You don’t have access to this resource</p>;
	// 		default:
	// 			return <p>Unexpected server error: {error.statusText}</p>;
	// 	}
	// };

	// if (error instanceof Error) {
	// 	// Client-side JS error
	// 	return <p>Something went wrong: {error.message}</p>;
	// }

	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<h1>Sajnos valami hiba történt...</h1>
			<p>{error?.data?.message || error?.message}</p>
			<p>Ha a hiba továbbra is fennáll, kérjük jelezze az adminisztrátorok felé!</p>
			<Button style="primary" type="submit" onClick={() => window.location.reload()}>
				Retry
			</Button>
			<Button style="primary" type="submit" onClick={() => navigate(-1)}>
				Vissza
			</Button>
		</form>
	);
};

export default ErrorLayout;
