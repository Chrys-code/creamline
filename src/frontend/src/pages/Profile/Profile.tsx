import type React from "react";
import type { PatchProfileFormData, Profile } from "../../api/types";
import type { ProfileProps } from "./Profile.types";
import styles from "./Profile.module.scss";

import Button from "../../components/button";
import Form from "../../components/form";
import InputField from "../../components/inputField";

import { useState } from "react";
import { useRouteLoaderData, useRevalidator } from "react-router";
import { useTypedTranslation } from "../../lib/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemas } from "../../api/schemas";
import { api } from "../../api/client";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
	const pt = useTypedTranslation("profile");
	const ct = useTypedTranslation("common");
	const data = useRouteLoaderData("app") as ProfileProps;
	const revalidator = useRevalidator();
	const [isEditing, setIsEditing] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<PatchProfileFormData>({
		resolver: zodResolver(schemas.PatchProfileSchema),
	});

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const onSubmit = async (formData: PatchProfileFormData) => {
		try {
			await api.put("/api/v1/profile/", formData);
			toast.success(pt("profile.notifications.update_success"));
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.first_name)
					setError("first_name", { message: responseData.first_name[0] });
				if (responseData.last_name)
					setError("last_name", { message: responseData.last_name[0] });
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
					{ct("common.cancel")}
				</Button>
				<Button style="primary" type="submit" disabled={isSubmitting}>
					{ct("common.save")}
				</Button>
			</div>
		);
	};

	const containerStyle = `${styles.container}`;

	return (
		<div className={containerStyle}>
			<div className={styles.profileImage}></div>
			<Form
				actionElements={renderFormActions()}
				onSubmit={handleSubmit(onSubmit, (err) => console.log({ err }))}
			>
				<section>
					<InputField
						id={uuid()}
						{...register("first_name", { onChange: () => clearErrors("first_name") })}
						type="text"
						label={pt("profile.input_labels.first_name")}
						defaultValue={data.profile.first_name}
						error={errors.first_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						{...register("last_name", { onChange: () => clearErrors("last_name") })}
						type="text"
						label={pt("profile.input_labels.last_name")}
						defaultValue={data.profile.last_name}
						error={errors.last_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						name="email"
						type="text"
						label="Email"
						defaultValue={data.profile.email}
						disabled={true}
					/>
					{!isEditing && (
						<>
							<div className={styles.editAaction}>
								<span></span>
								<Button style="secondary" type="button" onClick={handleEditClick}>
									{ct("common.edit")}
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
