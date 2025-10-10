import type { z } from "zod";
import type { MilkCollectionLoaderData } from "../../routes/loaders/types";
import styles from "./MilkCollection.module.scss";

import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../api/axios";
import { schemas } from "../../api/schemas";
import { useTranslation } from "react-i18next";

import convertMilkLiterAndKg from "../../lib/helpers/litreToKg";

const MilkSchema = schemas.MilkSchema;
type MilkFormData = z.infer<typeof MilkSchema>;

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const MilkCollection: React.FC = () => {
	const data: MilkCollectionLoaderData = useLoaderData();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<MilkFormData>({
		resolver: zodResolver(MilkSchema),
		defaultValues: {
			volume_kg: 0,
			volume_liters: 0,
			temperature: 0,
			acid_content: 0,
			aflatoxin: false,
			inhibitory_residue: false,
		},
	});

	const producerOptions = data.producers.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	}));
	const storageOptions = data.storages.map((storage) => ({
		id: storage.uuid,
		value: storage.name,
	}));
	const booleanOptions = [
		{ id: "true", value: t("common.yes") },
		{ id: "false", value: t("common.no") },
	];

	const onSubmit = async (formData: MilkFormData): Promise<void> => {
		try {
			await api.post("/api/v1/milk/", formData);
			toast.success(t("add_producer.notification_message"));
			navigate("/");
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
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;

		if (target.name == "volume_liters") {
			const value = convertMilkLiterAndKg({
				liters: Number(target.value),
				kg: undefined,
			});
			setValue("volume_kg", Number(value));
		}

		if (target.name == "volume_kg") {
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
			<PageHeader title={t("milk_collection.page_title")} />
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>{t("milk_collection.producer_section_title")}</h2>
					<div className={styles.sourceWrapper}>
						<Dropdown
							id={uuid()}
							{...register("producer", {
								onChange: () => clearErrors("producer"),
							})}
							placeholder={t("common.select")}
							options={producerOptions}
							error={errors.producer?.message}
						/>
						<IconButton type="button" onClick={() => navigate("/add-producer")}>
							<MdOutlineAddCircleOutline size="1.5rem" />
						</IconButton>
					</div>
					<Dropdown
						id={uuid()}
						{...register("storage", { onChange: () => clearErrors("storage") })}
						label={t("utilities.storage")}
						placeholder={t("common.select")}
						options={storageOptions}
						error={errors.storage?.message}
					/>
					<div className={styles.amountWrapper}>
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
							onChange={handleVolumeChange}
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
							onChange={handleVolumeChange}
						/>
					</div>
				</section>
				<section>
					<h2>{t("milk_collection.qualities_section_title")}</h2>
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
						error={errors.temperature?.message}
					/>
					<Dropdown
						id={uuid()}
						{...register("inhibitory_residue", {
							onChange: () => clearErrors("inhibitory_residue"),
						})}
						placeholder={t("common.select")}
						options={booleanOptions}
						label={t("qualities.inhibitory_residue")}
						info={t("units.positive_or_negative")}
						error={errors.inhibitory_residue?.message}
					/>
					<Dropdown
						id={uuid()}
						{...register("aflatoxin", {
							onChange: () => clearErrors("aflatoxin"),
						})}
						placeholder={t("common.select")}
						options={booleanOptions}
						label={t("qualities.aflatoxin")}
						info={t("units.more_or_less_than_50")}
						error={errors.aflatoxin?.message}
					/>
					<InputField
						id={uuid()}
						{...register("acid_content", {
							valueAsNumber: true,
							onChange: () => clearErrors("acid_content"),
						})}
						type="number"
						step="0.1"
						label={t("qualities.acid_level")}
						info={t("units.acid_level")}
						error={errors.acid_content?.message}
					/>
				</section>
			</Form>
		</>
	);
};

export default MilkCollection;
