import type React from "react";
import type { Pasteur } from "../../../features/domain/pasteur/types";

import PageHeader from "../../../shared/components/pageHeader";
import PasteurForm from "../../../features/domain/pasteur/forms/pasteurForm";

import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useLoaderData, useNavigate } from "react-router";

const EditPasteur: React.FC = () => {
	const navigate = useNavigate();
	const tPasteur = useTypedTranslation("pasteur");
	const pasteur = useLoaderData<Pasteur>();

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? tPasteur("edit_pasteur.page_titles.edit")
		: tPasteur("edit_pasteur.page_titles.create");

	return (
		<>
			<PageHeader title={pageTitle} onNavigateBack={() => navigate(-1)} />
			<PasteurForm pasteur={pasteur} />
		</>
	);
};

export default EditPasteur;
