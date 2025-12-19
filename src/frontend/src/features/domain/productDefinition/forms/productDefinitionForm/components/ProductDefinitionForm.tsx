import type React from "react";
import type { ProductDefinitionFormProps } from "./ProductDefinitionForm.types";

import Form from "@/shared/components/base/form";
import InputField from "@/shared/components/base/inputField";
import Dropdown from "@/shared/components/base/dropdown";
import Button from "@/shared/components/base/button";

import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";
import { useProductDefinitionForm } from "../hooks/useProductDefinitionForm";

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
					placeholder={tCommon("common.select")}
					label={tProductDefinition("edit_product_definition.input_labels.type")}
					options={productDefinitionTypeOptions}
					error={errors.type?.message}
				/>
			</section>
		</Form>
	);
};

export default ProductDefinitionForm;
