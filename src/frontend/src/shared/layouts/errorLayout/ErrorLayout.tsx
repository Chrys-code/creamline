import type React from "react";
import styles from "./ErrorLayout.module.scss";

import Button from "../../components/base/button";

import { useNavigate, isRouteErrorResponse, useRouteError } from "react-router";

const ErrorLayout: React.FC = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	const getStatusText = (status: number) => {
		switch (status) {
			case 404:
				return "Page not found";
			case 403:
				return "You don’t have access to this resource";
			default:
				return "Unexpected server error";
		}
	};

	if (isRouteErrorResponse(error)) {
		let details: string | null = null;

		if (error.data) {
			try {
				const parsed = JSON.parse(error.data as string);
				details = parsed.details;
			} catch {
				details = String(error.data);
			}
		}

		return (
			<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
				<h1>Failed to load page</h1>
				<p>
					{error.status} - {getStatusText(error.status)}
				</p>
				{details && <pre>{details}</pre>}
				<Button style="primary" type="submit" onClick={() => window.location.reload()}>
					Retry
				</Button>
				<Button style="primary" type="submit" onClick={() => navigate(-1)}>
					Vissza
				</Button>
			</form>
		);
	}

	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<h1>Sajnos valami hiba történt...</h1>
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
