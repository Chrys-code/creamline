import type React from "react";
import type { EditPasteurisationProps } from "./EditPasteurisation.types";

import PageHeader from "../../../shared/components/pageHeader/index";
import PasteurisationForm from "../../../features/domain/pasteurisation/forms/pasteurisationForm";

import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const EditPasteurisation: React.FC = () => {
	const { pasteurOptions, storageOptions, productDefinitionOptions, selectedItem } =
		useLoaderData<EditPasteurisationProps>();
	const tPasteurisation = useTypedTranslation("pasteurisation");
	const navigate = useNavigate();

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? tPasteurisation("edit_pasteurisation.page_titles.edit")
		: tPasteurisation("edit_pasteurisation.page_titles.create");

	return (
		<>
			<PageHeader
				title={pageTitle}
				onNavigateBack={() =>
					selectedItem ? navigate("/pasteurised-milk/") : navigate(-1)
				}
			/>
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
