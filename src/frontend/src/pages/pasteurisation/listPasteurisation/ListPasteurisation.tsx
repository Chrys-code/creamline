import type { ListPasteurisationProps } from "./ListPasteurisation.types";

import PageHeader from "../../../shared/components/pageHeader";
import PaginatedList from "../../../shared/components/paginatedList";
import PasteurisationCard from "../../../features/domain/pasteurisation/components/pasteurisationCard";
import IconButton from "../../../shared/components/base/iconButton";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import type { Pasteurisation } from "../../../features/domain/pasteurisation/types";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListPasteurisation: React.FC = () => {
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const pt = useTypedTranslation("pasteurisation");
	const { data, page } = useLoaderData<ListPasteurisationProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

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
				temperature={result.temperature}
				onClick={() => navigate(`edit/${result.uuid}`)}
			/>
		</li>
	);

	return (
		<>
			<PageHeader
				title={pt("list_pasteurisation.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={pasteurisedMilkListItem}
			/>
		</>
	);
};

export default ListPasteurisation;
