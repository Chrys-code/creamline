import type { MilkCollectionFormProps } from "./MilkCollectionForm.types.ts";
import styles from "./MilkCollectionForm.module.scss";

import Form from "../../../../shared/components/form";
import Dropdown from "../../../../shared/components/dropdown";
import IconButton from "../../../../shared/components/iconButton";
import InputField from "../../../../shared/components/inputField";
import Button from "../../../../shared/components/button";

import React from "react";
import { useNavigate } from "react-router";
import { useMilkCollectionForm } from "../hooks/useMilkCollectionForm";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";
import { v4 as uuid } from "uuid";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const MilkCollectionForm: React.FC<MilkCollectionFormProps> = ({
	milk,
	producerOptions,
	storageOptions,
}: MilkCollectionFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const mct = useTypedTranslation("milkCollection");

	const booleanOptions = [
		{ id: "true", value: tCommon("common.yes") },
		{ id: "false", value: tCommon("common.no") },
	];

	const {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
		handleVolumeChange,
	} = useMilkCollectionForm(milk);

	const renderFormActions = (): React.ReactNode => {
		if (milk) {
			return (
				<Button
					type="button"
					style="secondary"
					onClick={() => navigate("/milk-collection/")}
				>
					{tCommon("common.back")}
				</Button>
			);
		}

		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{tCommon("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{tCommon("common.save")}
				</Button>
			</>
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
			<section>
				<h2>{mct("edit_milk_collection.form_section.producer")}</h2>
				<div className={styles.sourceWrapper}>
					<Dropdown
						id={uuid()}
						{...register("producer", {
							onChange: () => clearErrors("producer"),
						})}
						placeholder={tCommon("common.select")}
						options={producerOptions}
						error={errors.producer?.message}
						disabled={!!milk}
					/>
					<IconButton
						type="button"
						onClick={() => navigate("/producer/create")}
						disabled={!!milk}
					>
						<MdOutlineAddCircleOutline size="1.5rem" />
					</IconButton>
				</div>
				<Dropdown
					id={uuid()}
					{...register("storage", { onChange: () => clearErrors("storage") })}
					label={tCommon("utilities.storage")}
					placeholder={tCommon("common.select")}
					options={storageOptions}
					error={errors.storage?.message}
					disabled={!!milk}
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
						label={tCommon("utilities.volume")}
						info={tCommon("units.liter")}
						error={errors.volume_liters?.message}
						disabled={!!milk}
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
						label={tCommon("utilities.volume")}
						info={tCommon("units.kg_short")}
						error={errors.volume_kg?.message}
						disabled={!!milk}
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
					label={tCommon("qualities.temperature")}
					info={tCommon("units.celsius")}
					error={errors.temperature?.message}
					disabled={!!milk}
				/>
				<Dropdown
					id={uuid()}
					{...register("inhibitory_residue", {
						onChange: () => clearErrors("inhibitory_residue"),
					})}
					placeholder={tCommon("common.select")}
					options={booleanOptions}
					label={tCommon("qualities.inhibitory_residue")}
					info={tCommon("units.positive_or_negative")}
					error={errors.inhibitory_residue?.message}
					disabled={!!milk}
				/>
				<Dropdown
					id={uuid()}
					{...register("aflatoxin", {
						onChange: () => clearErrors("aflatoxin"),
					})}
					placeholder={tCommon("common.select")}
					options={booleanOptions}
					label={tCommon("qualities.aflatoxin")}
					info={tCommon("units.more_or_less_than_50")}
					error={errors.aflatoxin?.message}
					disabled={!!milk}
				/>
				<InputField
					id={uuid()}
					{...register("acid_content", {
						valueAsNumber: true,
						onChange: () => clearErrors("acid_content"),
					})}
					type="number"
					step="0.1"
					label={tCommon("qualities.acid_level")}
					info={tCommon("units.acid_level")}
					error={errors.acid_content?.message}
					disabled={!!milk}
				/>
			</section>
		</Form>
	);
};

export default MilkCollectionForm;
