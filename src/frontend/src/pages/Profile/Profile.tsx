import type React from "react";
import type { RootLoaderData } from "../../routes/loaders/types";
import styles from "./Profile.module.scss";

import Button from "../../components/Button";
import Form from "../../components/Form";
import InputField from "../../components/InputField";

import { useState } from "react";
import { useRouteLoaderData, useRevalidator } from "react-router";
import { v4 as uuid } from "uuid";
import { updateProfile } from "../../api/profile";

const Profile: React.FC = () => {
	const data = useRouteLoaderData("app") as RootLoaderData;
	const revalidator = useRevalidator();
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// @ts-expect-error e.target is not available
		const formData = new FormData(e.target);

		const first_name = formData.get("first_name") as string;
		const last_name = formData.get("last_name") as string;

		const response = await updateProfile({
			first_name: first_name,
			last_name: last_name,
		});

		if (!response.response.ok) {
			//  show notification
		}

		revalidator.revalidate();
		setIsEditing(!isEditing);
	};

	const renderFormActions = () => {
		if (!isEditing) return null;

		return (
			<div className={styles.actions}>
				<Button style="secondary" type="button" onClick={handleEditClick}>
					Vissza
				</Button>
				<Button style="primary" type="submit">
					Mentés
				</Button>
			</div>
		);
	};

	const containerStyle = `${styles.container} ${isEditing ? "" : styles.preview}`;

	return (
		<div className={containerStyle}>
			<div className={styles.profileImage}></div>
			<Form actionElements={renderFormActions()} onSubmit={handleSubmit}>
				<section>
					<InputField
						id={uuid()}
						name="first_name"
						type="text"
						label="Vezetéknév:"
						defaultValue={data.profile.first_name}
						disabled={!isEditing}
					/>
					<InputField
						id={uuid()}
						name="last_name"
						type="text"
						label="Családnév:"
						defaultValue={data.profile.last_name}
						disabled={!isEditing}
					/>
					{!isEditing && (
						<>
							<InputField
								id={uuid()}
								name="name"
								type="text"
								label="Email:"
								defaultValue={data.profile.email}
								disabled={!isEditing}
							/>
							<div className={styles.actions}>
								<span></span>
								<Button style="secondary" type="button" onClick={handleEditClick}>
									Szerkesztés
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
