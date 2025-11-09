import type React from "react";
import type { Login } from "../../api/types";
import styles from "./Login.module.scss";

import AuthLayout from "../../layouts/authLayout";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import Form from "../../components/form";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";
import { useTypedTranslation } from "../../lib/hooks/useTypedTranslation/useTypedTranslation";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const at = useTypedTranslation("auth");

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
							label={at("login.input_labels.email")}
							type="text"
							error={errors.email?.message}
						/>
						<InputField
							id={uuidv4()}
							{...register("password", {
								onChange: () => clearErrors("password"),
							})}
							label={at("login.input_labels.password")}
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
