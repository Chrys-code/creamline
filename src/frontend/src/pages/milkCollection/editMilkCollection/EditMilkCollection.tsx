import type { EditMilkCollectionProps } from "./EditMilkCollection.types";
import type { CreateMilkFormSchema } from "../../../features/domain/milk/types";
import styles from "./EditMilkCollection.module.scss";

import PageHeader from "../../../shared/components/pageHeader";
import Form from "../../../shared/components/form";
import InputField from "../../../shared/components/inputField";
import Dropdown from "../../../shared/components/dropdown";
import Button from "../../../shared/components/button";
import IconButton from "../../../shared/components/iconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { milkClient } from "../../../features/domain/milk/services/client";
import milkSchemas from "../../../features/domain/milk/services/schemas";

import convertMilkLiterAndKg from "../../../shared/helpers/literToKg/literToKg";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const EditMilkCollection: React.FC = () => {
	const { producerOptions, storageOptions, selectedItem } =
		useLoaderData<EditMilkCollectionProps>();
	const navigate = useNavigate();
	const mct = useTypedTranslation("milkCollection");
	const ct = useTypedTranslation("common");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<CreateMilkFormSchema>({
		resolver: zodResolver(milkSchemas.CreateMilkFormSchema),
		mode: "onChange",
		defaultValues: {
			producer: selectedItem?.producer || undefined,
			storage: selectedItem?.storage || undefined,
			volume_kg: selectedItem?.volume_kg ?? 0,
			volume_liters: selectedItem?.volume_liters ?? 0,
			temperature: selectedItem?.temperature ?? 0,
			acid_content: selectedItem?.acid_content ?? 0,
			aflatoxin: selectedItem?.aflatoxin ?? false,
			inhibitory_residue: selectedItem?.inhibitory_residue ?? false,
		},
	});

	const booleanOptions = [
		{ id: "true", value: ct("common.yes") },
		{ id: "false", value: ct("common.no") },
	];

	const onSubmit = async (formData: CreateMilkFormSchema): Promise<void> => {
		try {
			await milkClient.v1_milk_create(formData);
			toast.success(mct("edit_milk_collection.notifications.create_success"));
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
					onClick={() => navigate("/milk-collection/")}
				>
					{ct("common.back")}
				</Button>
			);
		}

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

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? mct("edit_milk_collection.page_title.edit")
		: mct("edit_milk_collection.page_title.create");

	return (
		<>
			<PageHeader
				title={pageTitle}
				onNavigateBack={() => (selectedItem ? navigate("/milk-collection/") : navigate(-1))}
			/>
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>{mct("edit_milk_collection.form_section.producer")}</h2>
					<div className={styles.sourceWrapper}>
						<Dropdown
							id={uuid()}
							{...register("producer", {
								onChange: () => clearErrors("producer"),
							})}
							placeholder={ct("common.select")}
							options={producerOptions}
							error={errors.producer?.message}
							disabled={!!selectedItem}
						/>
						<IconButton
							type="button"
							onClick={() => navigate("/add-producer")}
							disabled={!!selectedItem}
						>
							<MdOutlineAddCircleOutline size="1.5rem" />
						</IconButton>
					</div>
					<Dropdown
						id={uuid()}
						{...register("storage", { onChange: () => clearErrors("storage") })}
						label={ct("utilities.storage")}
						placeholder={ct("common.select")}
						options={storageOptions}
						error={errors.storage?.message}
						disabled={!!selectedItem}
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
							label={ct("utilities.volume")}
							info={ct("units.liter")}
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
							label={ct("utilities.volume")}
							info={ct("units.kg_short")}
							error={errors.volume_kg?.message}
							disabled={!!selectedItem}
						/>
					</div>
				</section>
				<section>
					<h2>{mct("edit_milk_collection.form_section.qualities")}</h2>
					<InputField
						id={uuid()}
						{...register("temperature", {
							valueAsNumber: true,
							onChange: () => clearErrors("temperature"),
						})}
						type="number"
						step="0.1"
						label={ct("qualities.temperature")}
						info={ct("units.celsius")}
						error={errors.temperature?.message}
						disabled={!!selectedItem}
					/>
					<Dropdown
						id={uuid()}
						{...register("inhibitory_residue", {
							onChange: () => clearErrors("inhibitory_residue"),
						})}
						placeholder={ct("common.select")}
						options={booleanOptions}
						label={ct("qualities.inhibitory_residue")}
						info={ct("units.positive_or_negative")}
						error={errors.inhibitory_residue?.message}
						disabled={!!selectedItem}
					/>
					<Dropdown
						id={uuid()}
						{...register("aflatoxin", {
							onChange: () => clearErrors("aflatoxin"),
						})}
						placeholder={ct("common.select")}
						options={booleanOptions}
						label={ct("qualities.aflatoxin")}
						info={ct("units.more_or_less_than_50")}
						error={errors.aflatoxin?.message}
						disabled={!!selectedItem}
					/>
					<InputField
						id={uuid()}
						{...register("acid_content", {
							valueAsNumber: true,
							onChange: () => clearErrors("acid_content"),
						})}
						type="number"
						step="0.1"
						label={ct("qualities.acid_level")}
						info={ct("units.acid_level")}
						error={errors.acid_content?.message}
						disabled={!!selectedItem}
					/>
				</section>
			</Form>
		</>
	);
};

export default EditMilkCollection;
