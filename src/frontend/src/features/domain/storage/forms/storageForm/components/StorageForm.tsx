import type React from "react";
import type { StorageFormProps } from "./StorageForm.types.ts";

import Form from "@/shared/components/base/form";
import InputField from "@/shared/components/base/inputField";
import Dropdown from "@/shared/components/base/dropdown";
import Button from "@/shared/components/base/button";

import { v4 as uuid } from "uuid";

import { useNavigate } from "react-router";
import { useStorageForm } from "../hooks/useStorageForm";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const StorageForm: React.FC<StorageFormProps> = ({
	storage,
	storageTypeOptions,
}: StorageFormProps) => {
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
				<Dropdown
					id={uuid()}
					{...register("type", { onChange: () => clearErrors("type") })}
					placeholder={tCommon("common.select")}
					options={storageTypeOptions}
					error={errors.type?.message}
				/>
			</section>
		</Form>
	);
};

export default StorageForm;
