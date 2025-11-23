import type React from "react";
import type { StorageFormProps } from "./StorageForm.types.ts";

import Form from "../../../../shared/components/form";
import InputField from "../../../../shared/components/inputField";
import Button from "../../../../shared/components/button";

import { useNavigate } from "react-router";
import { useStorageForm } from "../hooks/useStorageForm.js";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";

const StorageForm: React.FC<StorageFormProps> = ({ storage }: StorageFormProps) => {
	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tStorage = useTypedTranslation("storage");

	const { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors } =
		useStorageForm(storage);

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
					label={tStorage("edit_storage.input_labels.name")}
					type="text"
					error={errors.name?.message}
				/>
				<InputField
					id={uuid()}
					{...register("type", { onChange: () => clearErrors("type") })}
					label={tStorage("edit_storage.input_labels.type")}
					type="text"
					error={errors.type?.message}
				/>
			</section>
		</Form>
	);
};

export default StorageForm;
