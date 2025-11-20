import type { EditMilkCollectionProps } from "./EditMilkCollection.types";

import PageHeader from "../../../shared/components/pageHeader";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

import MilkCollectionForm from "../../../features/composite/milkCollectionForm";

const EditMilkCollection: React.FC = () => {
	const { producerOptions, storageOptions, selectedItem } =
		useLoaderData<EditMilkCollectionProps>();
	const navigate = useNavigate();
	const mct = useTypedTranslation("milkCollection");

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? mct("edit_milk_collection.page_title.edit")
		: mct("edit_milk_collection.page_title.create");

	return (
		<>
			<PageHeader
				title={pageTitle}
				onNavigateBack={() => (selectedItem ? navigate("/milk-collection/") : navigate(-1))}
			/>
			<MilkCollectionForm
				milk={selectedItem}
				producerOptions={producerOptions}
				storageOptions={storageOptions}
			/>
		</>
	);
};

export default EditMilkCollection;
