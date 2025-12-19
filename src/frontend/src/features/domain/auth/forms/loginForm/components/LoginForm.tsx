import type React from "react";
import styles from "./LoginForm.module.scss";

import Form from "@/shared/components/base/form/Form";
import Button from "@/shared/components/base/button/Button";
import InputField from "@/shared/components/base/inputField/InputField";

import { v4 as uuidv4 } from "uuid";

import { useLoginForm } from "../hooks/useLoginForm";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const LoginForm: React.FC = () => {
	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } = useLoginForm();
	const tAuth = useTypedTranslation("auth");

	const renderFormActions = () => {
		return (
			<div className={styles.formActions}>
				{errors.detail && (
					<span className={styles.errorMessage}>{errors.detail.message}</span>
				)}
				<Button style="primary" type="submit" disabled={isSubmitting}>
					{tAuth("login.submit")}
				</Button>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<h1>{tAuth("login.title")}</h1>
				<section>
					<InputField
						id={uuidv4()}
						{...register("email", { onChange: () => clearErrors("email") })}
						label={tAuth("login.input_labels.email")}
						type="text"
						error={errors.email?.message}
					/>
					<InputField
						id={uuidv4()}
						{...register("password", {
							onChange: () => clearErrors("password"),
						})}
						label={tAuth("login.input_labels.password")}
						type="password"
						error={errors.password?.message}
					/>
				</section>
			</Form>
		</div>
	);
};

export default LoginForm;
