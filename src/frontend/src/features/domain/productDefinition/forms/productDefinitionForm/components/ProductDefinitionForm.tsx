import type React from "react";
import type { ProductDefinitionFormProps } from "./ProductDefinitionForm.types.ts";

import Button from "../../../../../../shared/components/button/index.js";
import Form from "../../../../../../shared/components/form/index.js";
import InputField from "../../../../../../shared/components/inputField/index.js";
import Dropdown from "../../../../../../shared/components/dropdown/index.js";

import { useNavigate } from "react-router";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";
import { useProductDefinitionForm } from "../hooks/useProductDefinitionForm.js";
import { v4 as uuid } from "uuid";

const ProductDefinitionForm: React.FC<ProductDefinitionFormProps> = ({
	productDefinition,
	productDefinitionTypeOptions,
}: ProductDefinitionFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tProductDefinition = useTypedTranslation("productDefinition");

	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } =
		useProductDefinitionForm(productDefinition);

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
				<InputField
					id={uuid()}
					{...register("name", { onChange: () => clearErrors("name") })}
					label={tProductDefinition("edit_product_definition.input_labels.name")}
					type="text"
					error={errors.name?.message}
				/>
				<Dropdown
					id={uuid()}
					{...register("type", { onChange: () => clearErrors("type") })}
					placeholder="select"
					label={tProductDefinition("edit_product_definition.input_labels.type")}
					options={productDefinitionTypeOptions}
					error={errors.type?.message}
				/>
			</section>
		</Form>
	);
};

export default ProductDefinitionForm;
