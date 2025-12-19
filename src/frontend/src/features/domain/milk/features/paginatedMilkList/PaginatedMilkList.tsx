import { NAVIGATION_ROUTES } from "@/configs/navigation";

import type React from "react";
import type { Milk } from "../../types";
import type { PaginatedMilkListProps } from "./PaginatedMilkList.types";

import PaginatedList from "@/shared/components/paginatedList";
import MilkCard from "../../components/milkCard";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const PaginatedMilkList: React.FC<PaginatedMilkListProps> = ({
	paginatedData,
	currentPage,
}: PaginatedMilkListProps) => {
	const { i18n } = useTranslation();
	const navigate = useNavigate();

	const milkListItem = (result: Milk) => (
		<li key={result.uuid} tabIndex={0}>
			<MilkCard
				title={result.producer_name}
				storages={result.storage_name}
				datetime={new Date(result.created_at).toLocaleString(i18n.language, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
				createdById={result.created_by}
				onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.edit.path + result.uuid)}
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
			itemRenderer={milkListItem}
		/>
	);
};

export default PaginatedMilkList;
