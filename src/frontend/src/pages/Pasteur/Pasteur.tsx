import type React from "react";
import type { PasteurProps } from "./Pasteur.types.js";
import type { CreateUpdatePasteurisedMilkFormData } from "../../api/types.js";
import styles from "./Pasteur.module.scss";

import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form";
import Dropdown from "../../components/Dropdown";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas.js";

import convertMilkLiterAndKg from "../../lib/helpers/literToKg/literToKg.js";

const Pasteur: React.FC = () => {
	const { pasteurs, storages, productDefinitions } = useLoaderData<PasteurProps>();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<CreateUpdatePasteurisedMilkFormData>({
		// @ts-expect-error local-datetime conversion issue
		resolver: zodResolver(schemas.CreateUpdatePasteurisedMilkSchema),
		mode: "onChange",
		defaultValues: {
			volume_kg: 0,
			volume_liters: 0,
			temperature: 0,
			start_date: new Date().toISOString().slice(0, 16),
			end_date: new Date().toISOString().slice(0, 16),
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

	const onSubmit = async (formData: CreateUpdatePasteurisedMilkFormData): Promise<void> => {
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

	const renderFormActions = (): React.ReactNode => (
		<>
			<Button type="button" style="secondary" onClick={() => navigate(-1)}>
				{t("common.back")}
			</Button>
			<Button type="submit" disabled={isSubmitting}>
				{t("common.save")}
			</Button>
		</>
	);

	return (
		<>
			<PageHeader title="Pasztőr" />
			{/*  @ts-expect-error local-datetime conversion issue  */}
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>Adatok:</h2>
					<Dropdown
						id={uuid()}
						{...register("pasteur", { onChange: () => clearErrors("pasteur") })}
						label="Pasztőr:"
						placeholder={t("common.select")}
						options={pasteurOptions}
						error={errors.pasteur?.message}
					/>
					<Dropdown
						id={uuid()}
						{...register("product_definition", {
							onChange: () => clearErrors("product_definition"),
						})}
						label="Céltermék:"
						placeholder={t("common.select")}
						options={productDefinitionOptions}
						error={errors.product_definition?.message}
					/>
					<InputField
						id={uuid()}
						{...register("temperature", {
							valueAsNumber: true,
							onChange: () => clearErrors("temperature"),
						})}
						type="number"
						step="0.1"
						label="Hőfok:"
						info="CELSIUS"
						defaultValue="0"
						error={errors.temperature?.message}
					/>
				</section>
				<section>
					<h2>Útvonal:</h2>
					<div className={styles.sideBySideWrapper}>
						<Dropdown
							id={uuid()}
							{...register("source_storage", {
								onChange: () => clearErrors("source_storage"),
							})}
							label="Honnan:"
							placeholder={t("common.select")}
							options={storageOptions}
							error={errors.source_storage?.message}
						/>
						<Dropdown
							id={uuid()}
							{...register("target_storage", {
								onChange: () => clearErrors("target_storage"),
							})}
							label="Hová:"
							placeholder={t("common.select")}
							options={storageOptions}
							error={errors.target_storage?.message}
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
							label="Mennyiség"
							info="LITER"
							error={errors.volume_liters?.message}
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
							label="Mennyiség"
							info="KG"
							error={errors.volume_kg?.message}
						/>
					</div>
				</section>
				<section>
					<h2>Időtartam:</h2>
					<InputField
						id={uuid()}
						{...register("start_date", {
							onChange: () => clearErrors("start_date"),
						})}
						type="datetime-local"
						label="Pasztőrőzés kezdete:"
						error={errors.start_date?.message}
					/>
					<InputField
						id={uuid()}
						{...register("end_date", {
							onChange: () => clearErrors("end_date"),
						})}
						type="datetime-local"
						label="Pasztőrőzés vége:"
						error={errors.end_date?.message}
					/>
				</section>
			</Form>
		</>
	);
};

export default Pasteur;
