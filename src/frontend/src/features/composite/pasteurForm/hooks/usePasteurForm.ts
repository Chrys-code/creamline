import type {
	CreatePasteurFormSchema,
	Pasteur,
	PasteurFormSchema,
	UpdatePasteurFormSchema,
} from "../../../domain/pasteur/types";

import { useNavigate } from "react-router";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { pasteurClient } from "../../../domain/pasteur/services/client";
import schemas from "../../../domain/pasteur/services/schemas";

export const usePasteurForm = (pasteur: Pasteur | null) => {
	const navigate = useNavigate();
	const tPasteur = useTypedTranslation("pasteur");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<PasteurFormSchema>({
		resolver: zodResolver(schemas.PasteurFormSchema),
		defaultValues: pasteur ?? {},
	});

	const createPasteur = async (formData: CreatePasteurFormSchema): Promise<void> => {
		try {
			await pasteurClient.v1_pasteur_create(formData);
			toast.success(tPasteur("edit_pasteur.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
			}
			toast.error(tPasteur("edit_pasteur.notifications.error"));
		}
	};

	const updatePasteur = async (formData: UpdatePasteurFormSchema, id: string): Promise<void> => {
		try {
			await pasteurClient.v1_pasteur_update(formData, { params: { uuid: id } });
			toast.success(tPasteur("edit_pasteur.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
			}
			toast.error(tPasteur("edit_pasteur.notifications.error"));
		}
	};

	const onSubmit = async (formData: PasteurFormSchema) => {
		if (pasteur && pasteur.uuid) {
			await updatePasteur(formData, pasteur.uuid);
			return;
		}

		await createPasteur(formData);
	};

	return {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
	};
};
