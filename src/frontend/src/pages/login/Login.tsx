import type React from "react";
import type { Login } from "../../api/types";
import styles from "./Login.module.scss";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Form from "../../components/Form";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<Login>({
		resolver: zodResolver(schemas.LoginSchema),
	});

	const onSubmit = async (formData: Login) => {
		try {
			await api.post("/api/login/", formData);
			navigate("/");
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.email) {
					setError("email", { message: responseData.email[0] });
				}

				if (responseData.password) {
					setError("password", { message: responseData.password[0] });
				}

				if (responseData.message) {
					setError("formMessage", { message: responseData.message });
				}
			}
		}
	};

	const renderFormActions = () => {
		return (
			<div className={styles.formActions}>
				{errors.formMessage && (
					<span className={styles.errorMessage}>{errors.formMessage.message}</span>
				)}
				<Button style="primary" type="submit" disabled={isSubmitting}>
					{t("login.submit")}
				</Button>
			</div>
		);
	};

	return (
		<AuthLayout>
			<div className={styles.container}>
				<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
					<h1>{t("login.title")}</h1>
					<section>
						<InputField
							id={uuidv4()}
							{...register("email", { onChange: () => clearErrors("email") })}
							label={t("login.input_email_label")}
							type="text"
							error={errors.email?.message}
						/>
						<InputField
							id={uuidv4()}
							{...register("password", {
								onChange: () => clearErrors("password"),
							})}
							label={t("login.input_password_label")}
							type="password"
							error={errors.password?.message}
						/>
					</section>
				</Form>
			</div>
		</AuthLayout>
	);
};

export default Login;
