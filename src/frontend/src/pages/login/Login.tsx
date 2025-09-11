import type { FormData } from "./Login.types";
import styles from "./Login.module.scss";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Form from "../../components/Form";

import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { login } from "../../api/auth";


const Login: React.FC = () => {
	const navigate = useNavigate();

	const [formFieldState, setFormFieldState] = useState<FormData>({
		email: {
			fieldName: "email",
			message: null,
		},
		password: {
			fieldName: "password",
			message: null,
		},
		formMessage: null
	});


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		// @ts-ignore
		const formData = new FormData(e.target);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const response = await login({ email: email, password: password });

		if (!response.ok) {
			const responseData = await response.json();

			const emailMessage = responseData.email ? responseData.email[0] : null;
			const passwordMessage = responseData.password ? responseData.password[0] : null;
			const formMessage = responseData.message ? responseData.message : null;

			setFormFieldState({
				email: {
					...formFieldState.email,
					message: emailMessage
				},
				password: {
					...formFieldState.password,
					message: passwordMessage
				},
				formMessage: formMessage
			});
		};

		if (response.ok && response.status == 200) {
			navigate("/");
		};
	}

	const resetMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const fieldName = e.target.name;

		setFormFieldState({
			email: {
				...formFieldState.email,
				message: fieldName == "email" ? null : formFieldState.email.message
			},
			password: {
				...formFieldState.password,
				message: fieldName == "password" ? null : formFieldState.password.message
			},
			formMessage: null
		});
	};

	const renderFormActions = () => {
		return (
			<div className={styles.formActions}>
				{formFieldState.formMessage && <span className={styles.errorMessage}>{formFieldState.formMessage}</span>}
				<Button style="primary" type="submit">Bejelentkezés</Button>
			</div>
		)
	}

	return (
		<AuthLayout>
			<div className={styles.container}>
				<Form onSubmit={handleSubmit} actionElements={renderFormActions()}>
					<h1>Bejelentkezés</h1>
					<section>
						<InputField id={uuidv4()} name={formFieldState.email.fieldName} label="Email:" type="text" onChange={resetMessage} error={formFieldState.email.message} />
						<InputField id={uuidv4()} name={formFieldState.password.fieldName} label="Jelszó:" type="password" onChange={resetMessage} error={formFieldState.password.message} />
					</section>
				</Form>
			</div>
		</AuthLayout>
	);
};

export default Login;