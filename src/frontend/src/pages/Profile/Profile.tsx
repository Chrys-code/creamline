import type React from "react";
import type { RootLoaderData } from "../../routes/loaders/types";
import type z from "zod";
import styles from "./Profile.module.scss";

import Button from "../../components/Button";
import Form from "../../components/Form";
import InputField from "../../components/InputField";

import { useState } from "react";
import { useRouteLoaderData, useRevalidator } from "react-router";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemas } from "../../api/schemas";
import { api } from "../../api/axios";
import { toast } from "react-toastify";

type ProfileFormData = z.infer<typeof schemas.PatchedProfileSchema>;

const Profile: React.FC = () => {
	const { t } = useTranslation();
	const data = useRouteLoaderData("app") as RootLoaderData;
	const revalidator = useRevalidator();
	const [isEditing, setIsEditing] = useState(false);

	const {
			register,
			handleSubmit,
			formState: { errors, isSubmitting },
			setError,
			clearErrors,
		} = useForm<ProfileFormData>({
			resolver: zodResolver(schemas.PatchedProfileSchema),
		});

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const onSubmit = async (formData: ProfileFormData) => {
		try {
			await api.put("/api/v1/profile/", formData);
			toast.success(t("profile.notification_message"));
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.first_name) setError("first_name", { message: responseData.first_name[0] });
				if (responseData.last_name) setError("last_name", { message: responseData.last_name[0] });
			}

		}

		revalidator.revalidate();
		setIsEditing(!isEditing);
	};

	const renderFormActions = () => {
		if (!isEditing) return null;

		return (
			<div className={styles.actions}>
				<Button style="secondary" type="button" onClick={handleEditClick}>
					{t("common.cancel")}
				</Button>
				<Button style="primary" type="submit" disabled={isSubmitting}>
					{t("common.save")}
				</Button>
			</div>
		);
	};

	const containerStyle = `${styles.container} ${isEditing ? "" : styles.preview}`;

	return (
		<div className={containerStyle}>
			<div className={styles.profileImage}></div>
			<Form actionElements={renderFormActions()} onSubmit={handleSubmit(onSubmit)}>
				<section>
					<InputField
						id={uuid()}
						{...register("first_name", { onChange: () => clearErrors("first_name") })}
						type="text"
						label={t("profile.input_first_name_label")}
						defaultValue={data.profile.first_name}
						error={errors.first_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						{...register("last_name", { onChange: () => clearErrors("last_name") })}
						type="text"
						label={t("profile.input_last_name_label")}
						defaultValue={data.profile.last_name}
						error={errors.last_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						name="name"
						type="text"
						label="Email"
						defaultValue={data.profile.email}
						disabled={!isEditing}
					/>
					{!isEditing && (
						<>
							<div className={styles.editAaction}>
								<span></span>
								<Button style="secondary" type="button" onClick={handleEditClick}>
									{t("common.edit")}
								</Button>
							</div>
						</>
					)}
				</section>
			</Form>
		</div>
	);
};

export default Profile;
