import type React from "react";
import type { UserFormProps } from "./UserForm.types";
import styles from "./UserForm.module.scss";

import Form from "../../../../../../shared/components/form/Form";
import Dropdown from "../../../../../../shared/components/dropdown/Dropdown";
import InputField from "../../../../../../shared/components/inputField/InputField";
import Button from "../../../../../../shared/components/button/Button";
import Chip from "../../../../../../shared/components/chip/Chip";

import { useNavigate } from "react-router";
import { useUserForm } from "../hooks/useUserForm";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";

const UserForm: React.FC<UserFormProps> = ({ user, userGroups }: UserFormProps) => {
	const navigate = useNavigate();
	const tUser = useTypedTranslation("users");
	const tCommon = useTypedTranslation("common");

	const {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		watch,
		clearErrors,
		addGroup,
		removeGroup,
	} = useUserForm(user);

	const handleRoleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		addGroup(Number(e.target.value));
		e.target.value = "init";
	};

	const renderGroups = () => {
		return watch("groups").map((group: number) => {
			const userGroup = userGroups.find((userGroup) => userGroup.id === Number(group));
			if (userGroup) {
				return (
					<li key={uuid()} onClick={() => removeGroup(Number(group))}>
						<Chip text={userGroup?.value} />
					</li>
				);
			}
			return null;
		});
	};

	const renderFormActions = (): React.ReactNode => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{tCommon("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{tCommon("common.save")}
				</Button>
			</>
		);
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, () => console.log(errors))}
			actionElements={renderFormActions()}
		>
			<section>
				<InputField
					id={uuid()}
					{...register("profile.first_name", {
						onChange: () => clearErrors("profile.first_name"),
					})}
					type="text"
					label={tUser("edit_user.input_labels.first_name") + ":"}
					error={errors.profile?.first_name?.message}
				/>
				<InputField
					id={uuid()}
					{...register("profile.last_name", {
						onChange: () => clearErrors("profile.last_name"),
					})}
					type="text"
					label={tUser("edit_user.input_labels.last_name") + ":"}
					error={errors.profile?.last_name?.message}
				/>
				<InputField
					id={uuid()}
					{...register("email", {
						onChange: () => clearErrors("email"),
					})}
					type="text"
					label={"Email:"}
					error={errors.email?.message}
				/>
				{!user && (
					<InputField
						id={uuid()}
						{...register("password", {
							onChange: () => clearErrors("password"),
						})}
						type="password"
						label={tUser("edit_user.input_labels.password") + ":"}
						error={errors.password?.message}
					/>
				)}
				<Dropdown
					name="roleSelectionDropdown"
					placeholder="Select position"
					label={tUser("edit_user.input_labels.position") + ":"}
					id={uuid()}
					onChange={handleRoleDropdownChange}
					options={userGroups}
				/>
				<ul className={styles.roleList}>{renderGroups()}</ul>
			</section>
		</Form>
	);
};

export default UserForm;
