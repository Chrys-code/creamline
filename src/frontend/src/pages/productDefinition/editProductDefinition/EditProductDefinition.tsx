import type React from "react";
import type { EditProductDefinitionProps } from "./EditProductDefinition.types";

import PageHeader from "../../../shared/components/pageHeader";
import ProductDefinitionForm from "../../../features/composite/productDefinitionForm/components/ProductDefinitionForm";

import { useLoaderData } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const EditProductDefinition: React.FC = () => {
	const { productDefinition, productDefinitionTypeOptions } =
		useLoaderData<EditProductDefinitionProps>();
	const tProductDefinition = useTypedTranslation("productDefinition");

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? tProductDefinition("edit_product_definition.page_title.edit")
		: tProductDefinition("edit_product_definition.page_title.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<ProductDefinitionForm
				productDefinition={productDefinition}
				productDefinitionTypeOptions={productDefinitionTypeOptions}
			/>
		</>
	);
};

export default EditProductDefinition;
