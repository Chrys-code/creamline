import type React from "react";
import type { ProfileFormProps } from "./ProfileForm.types";
import styles from "./ProfileForm.module.scss";

import Form from "../../../../../../shared/components/base/form";
import InputField from "../../../../../../shared/components/base/inputField";
import Button from "../../../../../../shared/components/base/button";

import { useProfileForm } from "../hooks/useProfileForm";
import { v4 as uuid } from "uuid";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const ProfileForm: React.FC<ProfileFormProps> = ({ profile }: ProfileFormProps) => {
	const tCommon = useTypedTranslation("common");
	const tProfile = useTypedTranslation("profile");

	const {
		isEditing,
		setIsEditing,
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
	} = useProfileForm(profile);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const renderFormActions = () => {
		if (!isEditing) return null;

		return (
			<div className={styles.actions}>
				<Button style="secondary" type="button" onClick={handleEditClick}>
					{tCommon("common.cancel")}
				</Button>
				<Button style="primary" type="submit" disabled={isSubmitting}>
					{tCommon("common.save")}
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
						label={tProfile("profile.input_labels.first_name")}
						error={errors.first_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						{...register("last_name", { onChange: () => clearErrors("last_name") })}
						type="text"
						label={tProfile("profile.input_labels.last_name")}
						error={errors.last_name?.message}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						name="email"
						type="text"
						label="Email"
						defaultValue={profile.email}
						disabled={true}
					/>
					{!isEditing && (
						<>
							<div className={styles.editAaction}>
								<span></span>
								<Button style="secondary" type="button" onClick={handleEditClick}>
									{tCommon("common.edit")}
								</Button>
							</div>
						</>
					)}
				</section>
			</Form>
		</div>
	);
};

export default ProfileForm;
