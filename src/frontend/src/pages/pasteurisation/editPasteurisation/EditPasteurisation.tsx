import type React from "react";
import type { EditPasteurisationProps } from "./EditPasteurisation.types";

import PageHeader from "@/shared/components/pageHeader/index";
import PasteurisationForm from "@/features/domain/pasteurisation/forms/pasteurisationForm";

import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const EditPasteurisation: React.FC = () => {
	const { pasteurOptions, storageOptions, productDefinitionOptions, selectedItem } =
		useLoaderData<EditPasteurisationProps>();
	const tPasteurisation = useTypedTranslation("pasteurisation");
	const navigate = useNavigate();

	const pageTitle = selectedItem
		? tPasteurisation("edit_pasteurisation.page_titles.edit")
		: tPasteurisation("edit_pasteurisation.page_titles.create");

	return (
		<>
			<PageHeader title={pageTitle} onNavigateBack={() => navigate(-1)} />
			<PasteurisationForm
				key={selectedItem?.uuid}
				pasteurisation={selectedItem}
				pasteurOptions={pasteurOptions}
				storageOptions={storageOptions}
				productDefinitionOptions={productDefinitionOptions}
			/>
		</>
	);
};

export default EditPasteurisation;
