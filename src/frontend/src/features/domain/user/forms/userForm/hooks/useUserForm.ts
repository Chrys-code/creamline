import type {
	CreateUserFormSchema,
	PatchUserFormSchema,
	User,
	UserFormSchema,
} from "../../../types";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { userClient } from "../../../services/client";
import userSchemas from "../../../services/schemas";

import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { NAVIGATION_ROUTES } from "../../../../../../configs/navigation";

export const useUserForm = (user: User) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tUser = useTypedTranslation("users");

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
		resolver: zodResolver(userSchemas.UserFormSchema),
		defaultValues: user ?? {
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

	const createUser = async (formData: CreateUserFormSchema): Promise<void> => {
		if (!formData.password || !formData.password.length) {
			setError("password", {
				type: "minLength",
				message: tCommon("errors.input_is_required"),
			});
			return;
		}

		try {
			await userClient.createUser(formData);
			toast.success(tUser("edit_user.notifications.success"));
			navigate(NAVIGATION_ROUTES.user.list.path);
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
			toast.error(tUser("edit_user.notifications.error"));
		}
	};

	const editUser = async (formData: PatchUserFormSchema, id: string): Promise<void> => {
		try {
			await userClient.updateUser(formData, { params: { uuid: id } });
			toast.success(tUser("edit_user.notifications.success"));
			navigate(NAVIGATION_ROUTES.user.list.path);
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
			toast.error(tUser("edit_user.notifications.error"));
		}
	};

	const onSubmit = async (formData: UserFormSchema): Promise<void> => {
		if (user && user.uuid) {
			await editUser(formData, user.uuid);
			return;
		}

		await createUser(formData);
	};

	const addGroup = (group: string) => {
		const currentGroups = getValues("groups");
		const updatedGrous = currentGroups.concat(group);
		setValue("groups", updatedGrous);
	};

	const removeGroup = (groupId: string) => {
		const currentGroups = getValues("groups");
		const updatedGroups = currentGroups.filter(
			(currentGroup: string) => currentGroup !== groupId
		);
		setValue("groups", updatedGroups);
	};

	return {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		watch,
		clearErrors,
		addGroup,
		removeGroup,
	};
};
