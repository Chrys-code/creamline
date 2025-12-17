import type React from "react";
import styles from "./ErrorLayout.module.scss";

import Button from "../../components/base/button";

import { useNavigate, isRouteErrorResponse, useRouteError } from "react-router";
import { useTypedTranslation } from "../../hooks/useTypedTranslation/useTypedTranslation";

const ErrorLayout: React.FC = () => {
	const error = useRouteError();
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tError = useTypedTranslation("errors");

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
				<h1>{tError("page.title")}</h1>
				<p>
					{error.status} - {error.statusText}
				</p>
				{details && <pre>{details}</pre>}
				<div>
					<Button style="primary" type="submit" onClick={() => navigate(-1)}>
						{tCommon("common.back")}
					</Button>
					<Button style="primary" type="submit" onClick={() => window.location.reload()}>
						{tCommon("common.retry")}
					</Button>
				</div>
			</form>
		);
	}

	return (
		<form className={styles.container} onSubmit={(e) => e.preventDefault()}>
			<h1>{tError("page.generic_title")}</h1>
			<p>{tError("page.generic_message")}</p>
			<div>
				<Button style="primary" type="submit" onClick={() => navigate(-1)}>
					{tCommon("common.back")}
				</Button>
				<Button style="primary" type="submit" onClick={() => window.location.reload()}>
					{tCommon("common.retry")}
				</Button>
			</div>
		</form>
	);
};

export default ErrorLayout;
