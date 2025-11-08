import type React from "react";
import type { CreatePasteurisedMilkFormData } from "../../../api/types.js";
import type { EditPasteurisationProps } from "./EditPasteurisation.types.js";
import styles from "./EditPasteurisation.module.scss";

import PageHeader from "../../../components/pageHeader/index.js";
import Form from "../../../components/form/index.js";
import Dropdown from "../../../components/dropdown/index.js";
import InputField from "../../../components/inputField/index.js";
import Button from "../../../components/button/index.js";

import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../../api/client.js";
import { schemas } from "../../../api/schemas.js";

import convertMilkLiterAndKg from "../../../lib/helpers/literToKg/literToKg.js";

const EditPasteurisation: React.FC = () => {
	const { pasteurs, storages, productDefinitions, selectedItem } =
		useLoaderData<EditPasteurisationProps>();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<CreatePasteurisedMilkFormData>({
		// @ts-expect-error local-datetime conversion issue
		resolver: zodResolver(schemas.CreatePasteurisedMilkSchema),
		mode: "onChange",
		defaultValues: {
			pasteur: selectedItem?.pasteur || undefined,
			product_definition: selectedItem?.product_definition || undefined,
			source_storage: selectedItem?.source_storage || undefined,
			target_storage: selectedItem?.target_storage || undefined,
			volume_kg: selectedItem?.volume_kg ?? 0,
			volume_liters: selectedItem?.volume_liters ?? 0,
			temperature: selectedItem?.temperature,
			start_date: selectedItem?.start_date
				? new Date(selectedItem.start_date).toISOString().slice(0, 16)
				: new Date().toISOString().slice(0, 16),
			end_date: selectedItem?.end_date
				? new Date(selectedItem.end_date).toISOString().slice(0, 16)
				: new Date().toISOString().slice(0, 16),
		},
	});

	const pasteurOptions =
		pasteurs?.map((pasteur) => ({
			id: pasteur.uuid,
			value: pasteur.name,
		})) || [];

	const storageOptions =
		storages?.map((storage) => ({
			id: storage.uuid,
			value: storage.name,
		})) || [];

	const productDefinitionOptions =
		productDefinitions?.map((productDefinition) => ({
			id: productDefinition.uuid,
			value: productDefinition.name,
		})) || [];

	const onSubmit = async (formData: CreatePasteurisedMilkFormData): Promise<void> => {
		try {
			await api.post("/api/v1/pasteurised-milk/", formData);
			toast.success("Pasztőr sikeresen elmentve!");
			navigate("/");
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

	const renderFormActions = (): React.ReactNode => {
		if (selectedItem) {
			return (
				<Button
					type="button"
					style="secondary"
					onClick={() => navigate("/pasteurised-milk")}
				>
					{t("common.back")}
				</Button>
			);
		}

		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{t("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{t("common.save")}
				</Button>
			</>
		);
	};

	return (
		<>
			<PageHeader
				title={t("pasteurised_milk.page_title")}
				onNavigateBack={() =>
					selectedItem ? navigate("/pasteurised-milk/") : navigate(-1)
				}
			/>
			{/*  @ts-expect-error local-datetime conversion issue  */}
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>{t("pasteurised_milk.data")}</h2>
					<Dropdown
						id={uuid()}
						{...register("pasteur", { onChange: () => clearErrors("pasteur") })}
						label={t("pasteurised_milk.input_pasteur_label")}
						placeholder={t("common.select")}
						options={pasteurOptions}
						error={errors.pasteur?.message}
						disabled={!!selectedItem}
					/>
					<Dropdown
						id={uuid()}
						{...register("product_definition", {
							onChange: () => clearErrors("product_definition"),
						})}
						label={t("pasteurised_milk.input_product_definition_label")}
						placeholder={t("common.select")}
						options={productDefinitionOptions}
						error={errors.product_definition?.message}
						disabled={!!selectedItem}
					/>
					<InputField
						id={uuid()}
						{...register("temperature", {
							valueAsNumber: true,
							onChange: () => clearErrors("temperature"),
						})}
						type="number"
						step="0.1"
						label={t("qualities.temperature")}
						info={t("units.celsius")}
						defaultValue="0"
						error={errors.temperature?.message}
						disabled={!!selectedItem}
					/>
				</section>
				<section>
					<h2>{t("pasteurised_milk.route")}</h2>
					<div className={styles.sideBySideWrapper}>
						<Dropdown
							id={uuid()}
							{...register("source_storage", {
								onChange: () => clearErrors("source_storage"),
							})}
							label={t("pasteurised_milk.input_source_storage_label")}
							placeholder={t("common.select")}
							options={storageOptions}
							error={errors.source_storage?.message}
							disabled={!!selectedItem}
						/>
						<Dropdown
							id={uuid()}
							{...register("target_storage", {
								onChange: () => clearErrors("target_storage"),
							})}
							label={t("pasteurised_milk.input_target_storage_label")}
							placeholder={t("common.select")}
							options={storageOptions}
							error={errors.target_storage?.message}
							disabled={!!selectedItem}
						/>
					</div>
					<div className={styles.sideBySideWrapper}>
						<InputField
							id={uuid()}
							{...register("volume_liters", {
								valueAsNumber: true,
								onChange: (e) => {
									clearErrors(["volume_liters", "volume_kg"]);
									handleVolumeChange(e);
								},
							})}
							type="number"
							step="0.01"
							label={t("utilities.volume")}
							info={t("units.liter")}
							error={errors.volume_liters?.message}
							disabled={!!selectedItem}
						/>
						<InputField
							id={uuid()}
							{...register("volume_kg", {
								valueAsNumber: true,
								onChange: (e) => {
									clearErrors(["volume_kg", "volume_liters"]);
									handleVolumeChange(e);
								},
							})}
							type="number"
							step="0.01"
							label={t("utilities.volume")}
							info={t("units.kg_short")}
							error={errors.volume_kg?.message}
							disabled={!!selectedItem}
						/>
					</div>
				</section>
				<section>
					<h2>{t("pasteurised_milk.duration")}</h2>
					<InputField
						id={uuid()}
						{...register("start_date", {
							onChange: () => clearErrors("start_date"),
						})}
						type="datetime-local"
						label={t("pasteurised_milk.pasteurisation_start")}
						error={errors.start_date?.message}
						disabled={!!selectedItem}
					/>
					<InputField
						id={uuid()}
						{...register("end_date", {
							onChange: () => clearErrors("end_date"),
						})}
						type="datetime-local"
						label={t("pasteurised_milk.pasteurisation_end")}
						error={errors.end_date?.message}
						disabled={!!selectedItem}
					/>
				</section>
			</Form>
		</>
	);
};

export default EditPasteurisation;
