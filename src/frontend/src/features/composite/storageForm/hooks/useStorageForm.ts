import { useNavigate } from "react-router";
import type {
	CreateStorageFormSchema,
	Storage,
	StorageFormSchema,
} from "../../../domain/storage/types";
import { useForm } from "react-hook-form";

import schemas from "../../../domain/storage/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { storageClient } from "../../../domain/storage/services/client";
import { toast } from "react-toastify";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

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

	const onSubmit = async (formData: StorageFormSchema) => {
		await createStorage(formData);
	};

	return { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors };
};
