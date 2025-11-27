import type {
	CreateProductDefinitionFormSchema,
	ProductDefinition,
	ProductDefinitionFormSchema,
	UpdateProductDefinitionFormSchema,
} from "../../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTypedTranslation } from "../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

import { productDefinitionClient } from "../../../services/client";
import schemas from "../../../services/schemas";
import { toast } from "react-toastify";

export const useProductDefinitionForm = (productDefinition: ProductDefinition | null) => {
	const navigate = useNavigate();
	const tProductDefinition = useTypedTranslation("productDefinition");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<ProductDefinitionFormSchema>({
		resolver: zodResolver(schemas.ProductDefinitionFormSchema),
		defaultValues: productDefinition ?? {},
	});

	const createProductDefinition = async (
		formData: CreateProductDefinitionFormSchema
	): Promise<void> => {
		try {
			await productDefinitionClient.v1_product_definition_create(formData);
			toast.success(tProductDefinition("edit_product_definition.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.type) setError("type", { message: responseData.type[0] });
			}
			toast.error(tProductDefinition("edit_product_definition.notifications.error"));
		}
	};

	const updateProductDefinition = async (
		formData: UpdateProductDefinitionFormSchema,
		id: string
	): Promise<void> => {
		try {
			await productDefinitionClient.v1_product_definition_update(formData, {
				params: { uuid: id },
			});
			toast.success(tProductDefinition("edit_product_definition.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			console.log(err);
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.type) setError("type", { message: responseData.type[0] });
			}
			toast.error(tProductDefinition("edit_product_definition.notifications.error"));
		}
	};

	const onSubmit = async (formData: ProductDefinitionFormSchema) => {
		if (productDefinition && productDefinition.uuid) {
			await updateProductDefinition(formData, productDefinition.uuid);
			return;
		}

		await createProductDefinition(formData);
	};

	return { errors, isSubmitting, register, handleSubmit, onSubmit, clearErrors };
};
