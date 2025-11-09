import type React from "react";
import type { UserFormData, CreateUserFormData, PatchUserFormData } from "../../../api/types";
import type { EditUserProps } from "./EditUser.types";
import styles from "./EditUser.module.scss";

import PageHeader from "../../../components/pageHeader/index";
import Form from "../../../components/form/index";
import InputField from "../../../components/inputField/index";
import Button from "../../../components/button/index";
import Dropdown from "../../../components/dropdown/Dropdown";
import Chip from "../../../components/chip/Chip";

import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTypedTranslation } from "../../../lib/hooks/useTypedTranslation/useTypedTranslation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../../api/client";
import { schemas } from "../../../api/schemas";

const EditUser: React.FC = () => {
	const { selectedItem, userGroups } = useLoaderData<EditUserProps>();
	const navigate = useNavigate();
	const ut = useTypedTranslation("users");
	const ct = useTypedTranslation("common");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		getValues,
		watch,
		setValue,
		setError,
		clearErrors,
	} = useForm({
		resolver: zodResolver(schemas.UserFormSchema),
		defaultValues: selectedItem ?? {
			email: undefined,
			uuid: undefined,
			groups: [],
			password: undefined,
			is_active: undefined,
			profile: {
				first_name: undefined,
				last_name: undefined,
			},
		},
	});

	const createUser = async (formData: CreateUserFormData): Promise<void> => {
		if (!formData.password || !formData.password.length) {
			setError("password", { type: "minLength", message: "Password is required" });
			return;
		}

		try {
			await api.v1_users_create(formData);
			toast.success("Felhasználó sikeresen elmentve");
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.first_name)
					setError("profile.first_name", { message: responseData.first_name[0] });
				if (responseData.last_name)
					setError("profile.last_name", { message: responseData.last_name[0] });
				if (responseData.email) setError("email", { message: responseData.email[0] });
				if (responseData.password)
					setError("password", { message: responseData.password[0] });
			}
		}
	};

	const editUser = async (formData: PatchUserFormData, id: string): Promise<void> => {
		try {
			await api.v1_users_partial_update(formData, { params: { uuid: id } });
			toast.success("Felhasználó sikeresen elmentve");
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.first_name)
					setError("profile.first_name", { message: responseData.first_name[0] });
				if (responseData.last_name)
					setError("profile.last_name", { message: responseData.last_name[0] });
				if (responseData.email) setError("email", { message: responseData.email[0] });
				if (responseData.password)
					setError("password", { message: responseData.password[0] });
			}
		}
	};

	const onSubmit = async (formData: UserFormData): Promise<void> => {
		if (selectedItem && selectedItem.uuid) {
			await editUser(formData, selectedItem.uuid);
			return;
		}

		await createUser(formData);
	};

	const addGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const currentGroups = getValues("groups");
		const updatedGrous = currentGroups.concat(Number(e.target.value));
		setValue("groups", updatedGrous);
	};

	const handleRoleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		addGroup(e);
		e.target.value = "init";
	};

	const removeGroup = (groupId: number) => {
		const currentGroups = getValues("groups");
		const updatedGroups = currentGroups.filter((currentGroup) => currentGroup !== groupId);
		setValue("groups", updatedGroups);
	};

	const renderFormActions = (): React.ReactNode => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{ct("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{ct("common.save")}
				</Button>
			</>
		);
	};

	const renderGroups = () => {
		return watch("groups").map((group) => {
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

	const isEditMode = window.location.pathname.includes("/users/edit/");
	const pageTitle = isEditMode
		? ut("edit_user.page_title.edit")
		: ut("edit_user.page_title.create");

	return (
		<>
			<PageHeader
				title={pageTitle}
				onNavigateBack={() => (selectedItem ? navigate("/users/") : navigate(-1))}
			/>
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
						label={ut("edit_user.input_labels.first_name") + ":"}
						error={errors.profile?.first_name?.message}
					/>
					<InputField
						id={uuid()}
						{...register("profile.last_name", {
							onChange: () => clearErrors("profile.last_name"),
						})}
						type="text"
						label={ut("edit_user.input_labels.last_name") + ":"}
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
					{!isEditMode && (
						<InputField
							id={uuid()}
							{...register("password", {
								onChange: () => clearErrors("password"),
							})}
							type="password"
							label={"Password:"}
							error={errors.password?.message}
						/>
					)}
					<Dropdown
						name="roleSelectionDropdown"
						placeholder="Select position"
						label={ut("edit_user.input_labels.position")}
						id={uuid()}
						onChange={handleRoleDropdownChange}
						options={userGroups}
					/>
					<ul className={styles.roleList}>{renderGroups()}</ul>
				</section>
			</Form>
		</>
	);
};

export default EditUser;
