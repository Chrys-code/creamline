import type React from "react";
import type { ProducerFormProps } from "./ProducerForm.types.ts";

import Form from "../../../../../../shared/components/base/form";
import InputField from "../../../../../../shared/components/base/inputField";
import Button from "../../../../../../shared/components/base/button";

import { useNavigate } from "react-router";
import { useProducerForm } from "../hooks/useProducerForm";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";

const ProducerForm: React.FC<ProducerFormProps> = ({ producer }: ProducerFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tProducer = useTypedTranslation("producer");

	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } =
		useProducerForm(producer);

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
				<h2>{tProducer("edit_producer.form_sections.form_title")}</h2>
				<InputField
					id={uuid()}
					{...register("name", { onChange: () => clearErrors("name") })}
					label={tProducer("edit_producer.input_labels.name")}
					type="text"
					error={errors.name?.message}
				/>
				<InputField
					id={uuid()}
					{...register("address", { onChange: () => clearErrors("address") })}
					label={tProducer("edit_producer.input_labels.address")}
					type="text"
					error={errors.address?.message}
				/>
				<InputField
					id={uuid()}
					{...register("contact_email", {
						onChange: () => clearErrors("contact_email"),
					})}
					label={tProducer("edit_producer.input_labels.contact_email")}
					info={tCommon("common.optional")}
					type="text"
					error={errors.contact_email?.message}
				/>
			</section>
		</Form>
	);
};

export default ProducerForm;
