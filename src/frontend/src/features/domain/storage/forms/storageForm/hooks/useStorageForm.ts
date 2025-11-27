import type {
	CreateStorageFormSchema,
	Storage,
	StorageFormSchema,
	UpdateStorageFormSchema,
} from "../../../types";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

import { storageClient } from "../../../services/client";
import schemas from "../../../services/schemas";
import { toast } from "react-toastify";

export const useStorageForm = (storage: Storage | null) => {
	const navigate = useNavigate();
	const tStorage = useTypedTranslation("storage");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<StorageFormSchema>({
		resolver: zodResolver(schemas.StorageFormSchema),
		defaultValues: storage ?? {},
	});

	const createStorage = async (formData: CreateStorageFormSchema): Promise<void> => {
		try {
			await storageClient.v1_storage_create(formData);
			toast.success(tStorage("edit_storage.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.type) setError("type", { message: responseData.type[0] });
			}
			toast.error(tStorage("edit_storage.notifications.error"));
		}
	};

	const updateStorage = async (formData: UpdateStorageFormSchema, id: string): Promise<void> => {
		try {
			await storageClient.v1_storage_update(formData, {
				params: { uuid: id },
			});
			toast.success(tStorage("edit_storage.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			console.log(err);
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.type) setError("type", { message: responseData.type[0] });
			}
			toast.error(tStorage("edit_storage.notifications.error"));
		}
	};

	const onSubmit = async (formData: StorageFormSchema) => {
		if (storage && storage.uuid) {
			await updateStorage(formData, storage.uuid);
			return;
		}

		await createStorage(formData);
	};

	return { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors };
};
