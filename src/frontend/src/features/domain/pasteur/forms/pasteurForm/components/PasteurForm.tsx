import type React from "react";
import type { PasteurFormProps } from "./PasteurForm.types.ts";

import Form from "../../../../../../shared/components/form";
import Button from "../../../../../../shared/components/button";
import InputField from "../../../../../../shared/components/inputField";

import { useNavigate } from "react-router";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { usePasteurForm } from "../hooks/usePasteurForm";
import { v4 as uuid } from "uuid";

const PasteurForm: React.FC<PasteurFormProps> = ({ pasteur }: PasteurFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tPasteur = useTypedTranslation("pasteur");

	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } =
		usePasteurForm(pasteur);

	const renderFormActions = (): React.ReactNode => {
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
				<h2>{tPasteur("edit_pasteur.form_sections.form_title")}</h2>
				<InputField
					id={uuid()}
					{...register("name", { onChange: () => clearErrors("name") })}
					label={tPasteur("edit_pasteur.input_labels.name")}
					type="text"
					error={errors.name?.message}
				/>
			</section>
		</Form>
	);
};

export default PasteurForm;
