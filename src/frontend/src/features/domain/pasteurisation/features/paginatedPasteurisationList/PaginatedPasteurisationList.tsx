import { NAVIGATION_ROUTES } from "@/configs/navigation";

import type { Pasteurisation } from "../../types";

import type React from "react";
import type { PaginatedPasteurisationListProps } from "./PaginatedPasteurisationList.types";

import PaginatedList from "@/shared/components/paginatedList";
import PasteurisationCard from "../../components/pasteurisationCard";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const PaginatedPasteurisationList: React.FC<PaginatedPasteurisationListProps> = ({
	paginatedData,
	currentPage,
}: PaginatedPasteurisationListProps) => {
	const navigate = useNavigate();
	const { i18n } = useTranslation();

	const pasteurisedMilkListItem = (result: Pasteurisation) => (
		<li key={result.uuid} tabIndex={0}>
			<PasteurisationCard
				title={result.pasteur_name}
				source_storage={result.source_storage_name}
				target_storage={result.target_storage_name}
				datetime={new Date(result.created_at).toLocaleString(i18n.language, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
				createdById={result.created_by}
				onClick={() => navigate(NAVIGATION_ROUTES.pasteuriation.edit.path + result.uuid)}
			/>
		</li>
	);

	return (
		<PaginatedList
			items={paginatedData.results}
			itemCount={paginatedData.count}
			currentPage={currentPage}
			nextPage={paginatedData.next}
			previousPage={paginatedData.previous}
			itemRenderer={pasteurisedMilkListItem}
		/>
	);
};

export default PaginatedPasteurisationList;
