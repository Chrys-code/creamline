import type { ListPasteursProps } from "./ListPasteurs.types.ts";
import type { Pasteur } from "../../../features/domain/pasteur/types";

import PageHeader from "../../../shared/components/pageHeader";
import IconButton from "../../../shared/components/base/iconButton";
import PaginatedList from "../../../shared/components/paginatedList";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import PasteurCard from "../../../features/domain/pasteur/components/pasteurCard/PasteurCard";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListPasteurs: React.FC = () => {
	const navigate = useNavigate();
	const {
		data: { data, page },
	} = useLoaderData<ListPasteursProps>();
	const tPasteur = useTypedTranslation("pasteur");

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const pasteurListItem = (item: Pasteur) => {
		return (
			<li key={item.uuid} tabIndex={0}>
				<PasteurCard name={item.name} onClick={() => navigate(`edit/${item.uuid}`)} />
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={tPasteur("list_pasteurs.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={pasteurListItem}
			/>
		</>
	);
};

export default ListPasteurs;
