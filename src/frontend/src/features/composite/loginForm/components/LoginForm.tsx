import type React from "react";
import styles from "./LoginForm.module.scss";

import Form from "../../../../shared/components/form/Form";
import Button from "../../../../shared/components/button/Button";
import InputField from "../../../../shared/components/inputField/InputField";

import { useLoginForm } from "../hooks/useLoginForm";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuidv4 } from "uuid";

const LoginForm: React.FC = () => {
	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } = useLoginForm();
	const tAuth = useTypedTranslation("auth");

	const renderFormActions = () => {
		return (
			<div className={styles.formActions}>
				{errors.message && (
					<span className={styles.errorMessage}>{errors.message.message}</span>
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
