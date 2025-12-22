import type { LoginFormSchema } from "../../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import schemas from "../../../services/authSchemas";
import { authClient } from "../../../services/authClient";

export const useLoginForm = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<LoginFormSchema>({
		resolver: zodResolver(schemas.LoginFormSchema),
	});

	const onSubmit = async (formData: LoginFormSchema) => {
		try {
			await authClient.login(formData);
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

				if (responseData.detail) {
					setError("detail", { message: responseData.detail });
				}
			}
		}
	};

	return {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
	};
};
