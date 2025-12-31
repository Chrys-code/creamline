import type React from "react";
import type { UserFormProps } from "./UserForm.types";
import styles from "./UserForm.module.scss";

import Button from "@/shared/components/base/button/Button";
import Chip from "@/shared/components/base/chip/Chip";
import ConfirmationDialogForm from "@/shared/components/confirmationDialogForm";
import Dropdown from "@/shared/components/base/dropdown/Dropdown";
import Dialog from "@/shared/components/dialog";
import Form from "@/shared/components/base/form/Form";
import InputField from "@/shared/components/base/inputField/InputField";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserForm } from "../hooks/useUserForm";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";

const UserForm: React.FC<UserFormProps> = ({ user, userGroups }: UserFormProps) => {
	const navigate = useNavigate();
	const tUser = useTypedTranslation("users");
	const tCommon = useTypedTranslation("common");

	const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false);

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
		deactivate,
	} = useUserForm(user);

	const handleRoleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		addGroup(e.target.value);
		e.target.value = "init";
	};

	const renderGroups = () => {
		return watch("groups").map((group: string) => {
			const userGroup = userGroups.find((userGroup) => userGroup.id === group);
			if (userGroup) {
				return (
					<li key={uuid()} onClick={() => removeGroup(group)}>
						<Chip text={userGroup?.value} />
					</li>
				);
			}
			return null;
		});
	};

	const renderFormActions = (): React.ReactNode => {
		const disabled = isSubmitting || !user?.is_active;
		const deactiveButtonText = user?.is_active
			? tCommon("common.deactivate")
			: tCommon("common.deactivated");

		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{tCommon("common.back")}
				</Button>
				<div className={styles.actionsWrapper}>
					{user && (
						<Button
							type="button"
							style="secondary"
							actionType="negative"
							disabled={disabled}
							onClick={() => setConfirmationDialogIsOpen(true)}
						>
							{deactiveButtonText}
						</Button>
					)}
					<Button type="submit" disabled={isSubmitting}>
						{tCommon("common.save")}
					</Button>
				</div>
			</>
		);
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
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
						placeholder={tCommon("common.select")}
						label={tUser("edit_user.input_labels.position") + ":"}
						id={uuid()}
						onChange={handleRoleDropdownChange}
						options={userGroups}
					/>
					<ul className={styles.roleList}>{renderGroups()}</ul>
				</section>
			</Form>
			<Dialog
				title={tUser("edit_user.confirmation_dialog.title")}
				isOpen={confirmationDialogIsOpen}
				onClose={() => setConfirmationDialogIsOpen(false)}
			>
				<ConfirmationDialogForm
					title={tUser("edit_user.confirmation_dialog.content_title")}
					message={tUser("edit_user.confirmation_dialog.content_message")}
					onClose={() => setConfirmationDialogIsOpen(false)}
					onSubmit={() => deactivate()}
				/>
			</Dialog>
		</>
	);
};

export default UserForm;
