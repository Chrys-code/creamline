import type { FormData } from "./Login.types";
import styles from "./Login.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

import Header from "../../layouts/Header";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Form from "../../components/Form";

import { login } from "../../api/auth/login";


const Login: React.FC = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<FormData>({
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


	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		// @ts-ignore
		const response = await login({ email: e.target.elements[0].value, password: e.target.elements[1].value });

		if (!response.ok) {
			const responseData = await response.json();

			const emailMessage = responseData.email ? responseData.email[0] : null;
			const passwordMessage = responseData.password ? responseData.password[0] : null;
			const formMessage = responseData.message ? responseData.message : null;

			setFormData({
				email: {
					...formData.email,
					message: emailMessage
				},
				password: {
					...formData.password,
					message: passwordMessage
				},
				formMessage: formMessage
			});
		};

		if (response.ok && response.status == 200) {
			console.log("RUNS")
			navigate("/");
		};
	}

	const resetMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const fieldName = e.target.name;

		setFormData({
			email: {
				...formData.email,
				message: fieldName == "email" ? null : formData.email.message
			},
			password: {
				...formData.password,
				message: fieldName == "password" ? null : formData.password.message
			},
			formMessage: null
		});
	};

	return (
		<>
			<Header />
			<main>
				<Form onSubmit={handleSubmit}>
					<InputField id={uuidv4()} name={formData.email.fieldName} label="Email:" type="text" onChange={resetMessage} error={formData.email.message} />
					<InputField id={uuidv4()} name={formData.password.fieldName} label="Jelszó:" type="password" onChange={resetMessage} error={formData.password.message} />
					<div className={styles.formActions}>
						{formData.formMessage && <span className={styles.errorMessage}>{formData.formMessage}</span>}
						<Button type="primary">Bejelentkezés</Button>
					</div>
				</Form>
			</main>
		</>
	);
};

export default Login;