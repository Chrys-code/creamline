import type React from "react";
import type { PasteurisationFormProps } from "./PasteurisationForm.types.ts";
import styles from "./PasteurisationForm.module.scss";

import Form from "../../../../../../shared/components/base/form";
import Dropdown from "../../../../../../shared/components/base/dropdown";
import InputField from "../../../../../../shared/components/base/inputField";
import Button from "../../../../../../shared/components/base/button";

import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { usePasteurisationForm } from "../hooks/usePasteurisationForm.js";
import { NAVIGATION_ROUTES } from "../../../../../../configs/navigation.js";

const PasteurisationForm: React.FC<PasteurisationFormProps> = ({
	pasteurisation,
	pasteurOptions,
	storageOptions,
	productDefinitionOptions,
}: PasteurisationFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
		handleVolumeChange,
	} = usePasteurisationForm(pasteurisation);

	const renderFormActions = (): React.ReactNode => {
		if (pasteurisation) {
			return (
				<Button
					type="button"
					style="secondary"
					onClick={() => navigate(NAVIGATION_ROUTES.pasteuriation.list.path)}
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
		/*  @ts-expect-error local-datetime conversion issue with zod package version 3 while 4 supports it  */
		<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
			<section>
				<h2>{tPasteurisation("edit_pasteurisation.form_sections.data")}</h2>
				<Dropdown
					id={uuid()}
					{...register("pasteur", { onChange: () => clearErrors("pasteur") })}
					label={tPasteurisation("edit_pasteurisation.input_labels.pasteur")}
					placeholder={tCommon("common.select")}
					options={pasteurOptions}
					error={errors.pasteur?.message}
					disabled={!!pasteurisation}
				/>
				<Dropdown
					id={uuid()}
					{...register("product_definition", {
						onChange: () => clearErrors("product_definition"),
					})}
					label={tPasteurisation("edit_pasteurisation.input_labels.product_definition")}
					placeholder={tCommon("common.select")}
					options={productDefinitionOptions}
					error={errors.product_definition?.message}
					disabled={!!pasteurisation}
				/>
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
					defaultValue="0"
					error={errors.temperature?.message}
					disabled={!!pasteurisation}
				/>
			</section>
			<section>
				<h2>{tPasteurisation("edit_pasteurisation.form_sections.route")}</h2>
				<div className={styles.sideBySideWrapper}>
					<Dropdown
						id={uuid()}
						{...register("source_storage", {
							onChange: () => clearErrors("source_storage"),
						})}
						label={tPasteurisation("edit_pasteurisation.input_labels.source_storage")}
						placeholder={tCommon("common.select")}
						options={storageOptions}
						error={errors.source_storage?.message}
						disabled={!!pasteurisation}
					/>
					<Dropdown
						id={uuid()}
						{...register("target_storage", {
							onChange: () => clearErrors("target_storage"),
						})}
						label={tPasteurisation("edit_pasteurisation.input_labels.target_storage")}
						placeholder={tCommon("common.select")}
						options={storageOptions}
						error={errors.target_storage?.message}
						disabled={!!pasteurisation}
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
						label={tCommon("utilities.volume")}
						info={tCommon("units.liter")}
						error={errors.volume_liters?.message}
						disabled={!!pasteurisation}
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
						disabled={!!pasteurisation}
					/>
				</div>
			</section>
			<section>
				<h2>{tPasteurisation("edit_pasteurisation.form_sections.duration")}</h2>
				<InputField
					id={uuid()}
					{...register("start_date", {
						onChange: () => clearErrors("start_date"),
					})}
					type="datetime-local"
					label={tPasteurisation("edit_pasteurisation.input_labels.pasteurisation_start")}
					error={errors.start_date?.message}
					disabled={!!pasteurisation}
				/>
				<InputField
					id={uuid()}
					{...register("end_date", {
						onChange: () => clearErrors("end_date"),
					})}
					type="datetime-local"
					label={tPasteurisation("edit_pasteurisation.input_labels.pasteurisation_end")}
					error={errors.end_date?.message}
					disabled={!!pasteurisation}
				/>
			</section>
		</Form>
	);
};

export default PasteurisationForm;
