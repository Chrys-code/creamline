import type { ListProducersProps } from "./ListProducers.types";
import type { Producer } from "../../../features/domain/producer/types";

import React from "react";
import PageHeader from "../../../shared/components/pageHeader";
import PaginatedList from "../../../shared/components/paginatedList";
import ProducerCard from "../../../features/domain/producer/components/producerCard";
import IconButton from "../../../shared/components/base/iconButton";

import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

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
	const tProducer = useTypedTranslation("producer");

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const producerListItem = (item: Producer) => {
		return (
			<li key={item.uuid} tabIndex={0}>
				<ProducerCard
					name={item.name}
					address={item.address}
					onClick={() => navigate(`edit/${item.uuid}`)}
				/>
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={tProducer("list_producers.page_title")}
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
