import type { PatchProfileFormSchema, Profile } from "../../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useState } from "react";
import { useRevalidator } from "react-router";
import { useForm } from "react-hook-form";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

import { profileClient } from "../../../services/client";
import schemas from "../../../services/schemas";

export const useProfileForm = (profile: Profile) => {
	const revalidator = useRevalidator();
	const tProfile = useTypedTranslation("profile");

	const [isEditing, setIsEditing] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<PatchProfileFormSchema>({
		resolver: zodResolver(schemas.PatchProfileFormSchema),
		defaultValues: profile ?? {},
	});

	const onSubmit = async (formData: PatchProfileFormSchema) => {
		try {
			await profileClient.updateProfile(formData);
			toast.success(tProfile("profile.notifications.success"));
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.first_name)
					setError("first_name", { message: responseData.first_name[0] });
				if (responseData.last_name)
					setError("last_name", { message: responseData.last_name[0] });
			}

			if (err.response?.status !== 500 && err.response?.data.detail) {
				toast.error(err.response?.data.detail);
			} else {
				toast.error(tProfile("profile.notifications.error"));
			}
		}

		revalidator.revalidate();
		setIsEditing(!isEditing);
	};

	return {
		isEditing,
		setIsEditing,
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
	};
};
