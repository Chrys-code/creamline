import type { ListMilkCollectionProps } from "./ListMilkCollection.types";
import type { Milk } from "../../../features/domain/milk/types";

import PageHeader from "../../../shared/components/pageHeader";
import PaginatedList from "../../../shared/components/paginatedList";
import MilkCard from "../../../features/domain/milk/components/milkCard";
import IconButton from "../../../shared/components/base/iconButton";

import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useLoaderData, useNavigate } from "react-router";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListMilkCollection: React.FC = () => {
	const navigate = useNavigate();
	const { i18n } = useTranslation();
	const mct = useTypedTranslation("milkCollection");
	const { data, page } = useLoaderData<ListMilkCollectionProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

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
				onClick={() => navigate(`edit/${result.uuid}`)}
			/>
		</li>
	);

	return (
		<>
			<PageHeader
				title={mct("list_milk_collection.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>

			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={milkListItem}
			/>
		</>
	);
};

export default ListMilkCollection;
