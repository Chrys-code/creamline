import type React from "react";
import type { EditProductDefinitionProps } from "./EditProductDefinition.types";

import PageHeader from "@/shared/components/pageHeader";
import ProductDefinitionForm from "@/features/domain/productDefinition/forms/productDefinitionForm";

import { useLoaderData } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const EditProductDefinition: React.FC = () => {
	const { productDefinition, productDefinitionTypeOptions } =
		useLoaderData<EditProductDefinitionProps>();
	const tProductDefinition = useTypedTranslation("productDefinition");

	const pageTitle = productDefinition
		? tProductDefinition("edit_product_definition.page_title.edit")
		: tProductDefinition("edit_product_definition.page_title.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<ProductDefinitionForm
				key={productDefinition?.uuid}
				productDefinition={productDefinition}
				productDefinitionTypeOptions={productDefinitionTypeOptions}
			/>
		</>
	);
};

export default EditProductDefinition;
