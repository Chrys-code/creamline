import type React from "react";
import type {
	CreatePasteurisationFormSchema,
	Pasteurisation,
} from "../../../domain/pasteurisation/types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import pasteurisationClient from "../../../domain/pasteurisation/services/client";
import schemas from "../../../domain/pasteurisation/services/schemas";
import convertMilkLiterAndKg from "../../../../shared/helpers/literToKg/literToKg";
import { useNavigate } from "react-router";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

export const usePasteurisationForm = (pasteurisation: Pasteurisation | null) => {
	const navigate = useNavigate();
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<CreatePasteurisationFormSchema>({
		// @ts-expect-error local-datetime conversion issue
		resolver: zodResolver(schemas.CreatePasteurisationFormSchema),
		mode: "onChange",
		defaultValues: {
			pasteur: pasteurisation?.pasteur || undefined,
			product_definition: pasteurisation?.product_definition || undefined,
			source_storage: pasteurisation?.source_storage || undefined,
			target_storage: pasteurisation?.target_storage || undefined,
			volume_kg: pasteurisation?.volume_kg ?? 0,
			volume_liters: pasteurisation?.volume_liters ?? 0,
			temperature: pasteurisation?.temperature,
			start_date: pasteurisation?.start_date
				? new Date(pasteurisation.start_date).toISOString().slice(0, 16)
				: new Date().toISOString().slice(0, 16),
			end_date: pasteurisation?.end_date
				? new Date(pasteurisation.end_date).toISOString().slice(0, 16)
				: new Date().toISOString().slice(0, 16),
		},
	});

	const onSubmit = async (formData: CreatePasteurisationFormSchema): Promise<void> => {
		try {
			await pasteurisationClient.v1_pasteurisation_create(formData);
			toast.success(tPasteurisation("edit_pasteurisation.notifications.success"));
			navigate("/pasteurised-milk");
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.pasteur) setError("pasteur", { message: responseData.pasteur[0] });
				if (responseData.target_storage)
					setError("target_storage", { message: responseData.source_storage[0] });
				if (responseData.source_storage)
					setError("source_storage", { message: responseData.source_storage[0] });
				if (responseData.volume_kg)
					setError("volume_kg", { message: responseData.volume_kg[0] });
				if (responseData.volume_liters)
					setError("volume_liters", { message: responseData.volume_liters[0] });
				if (responseData.temperature)
					setError("temperature", { message: responseData.temperature[0] });
			}
			toast.error(tPasteurisation("edit_pasteurisation.notifications.error"));
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;

		if (target.name === "volume_liters") {
			const value = convertMilkLiterAndKg({
				liters: Number(target.value),
				kg: undefined,
			});
			setValue("volume_kg", Number(value));
		}

		if (target.name === "volume_kg") {
			const value = convertMilkLiterAndKg({
				liters: undefined,
				kg: Number(target.value),
			});
			setValue("volume_liters", Number(value));
		}
	};

	return {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
		handleVolumeChange,
	};
};
