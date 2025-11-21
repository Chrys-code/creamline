import React from "react";
import type { ListProducersProps } from "./ListProducers.types";
import { useLoaderData, useNavigate } from "react-router";
import IconButton from "../../../shared/components/iconButton";
import type { Producer } from "../../../features/domain/producer/types";
import PageHeader from "../../../shared/components/pageHeader";
import PaginatedList from "../../../shared/components/paginatedList";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListProducers: React.FC = () => {
	const navigate = useNavigate();
	const {
		data: { data, page },
	} = useLoaderData<ListProducersProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const producerListItem = (item: Producer) => {
		return (
			<li key={item.uuid} tabIndex={0}>
				<p>{item.name}</p>
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={"smth"}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={producerListItem}
			/>
		</>
	);
};

export default ListProducers;
