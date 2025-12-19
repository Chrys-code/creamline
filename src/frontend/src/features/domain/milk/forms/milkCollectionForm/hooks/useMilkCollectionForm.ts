import { NAVIGATION_ROUTES } from "@/configs/navigation";

import type React from "react";
import type { CreateMilkFormSchema, Milk } from "../../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

import { milkClient } from "../../../services/client";
import schemas from "../../../services/schemas";

import convertMilkLiterAndKg from "@/shared/helpers/literToKg/literToKg";

export const useMilkCollectionForm = (milk: Milk | null) => {
	const navigate = useNavigate();
	const mct = useTypedTranslation("milkCollection");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<CreateMilkFormSchema>({
		resolver: zodResolver(schemas.CreateMilkFormSchema),
		mode: "onChange",
		defaultValues: {
			producer: milk?.producer || undefined,
			storage: milk?.storage || undefined,
			volume_kg: milk?.volume_kg ?? 0,
			volume_liters: milk?.volume_liters ?? 0,
			temperature: milk?.temperature ?? 0,
			acid_content: milk?.acid_content ?? 0,
			aflatoxin: milk?.aflatoxin ?? false,
			inhibitory_residue: milk?.inhibitory_residue ?? false,
		},
	});

	const onSubmit = async (formData: CreateMilkFormSchema): Promise<void> => {
		try {
			await milkClient.createMilk(formData);
			toast.success(mct("edit_milk_collection.notifications.success"));
			navigate(NAVIGATION_ROUTES.milkCollection.list.path);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.producer)
					setError("producer", { message: responseData.producer[0] });
				if (responseData.storage) setError("storage", { message: responseData.storage[0] });
				if (responseData.volume_kg)
					setError("volume_kg", { message: responseData.volume_kg[0] });
				if (responseData.volume_liters)
					setError("volume_liters", { message: responseData.volume_liters[0] });
				if (responseData.acid_content)
					setError("acid_content", { message: responseData.acid_content[0] });
				if (responseData.aflatoxin)
					setError("aflatoxin", { message: responseData.aflatoxin[0] });
				if (responseData.inhibitory_residue)
					setError("inhibitory_residue", {
						message: responseData.inhibitory_residue[0],
					});
				if (responseData.temperature)
					setError("temperature", { message: responseData.temperature[0] });
			}

			if (err.response?.status !== 500 && err.response?.data.detail) {
				toast.error(err.response?.data.detail);
			} else {
				toast.error(mct("edit_milk_collection.notifications.error"));
			}
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
