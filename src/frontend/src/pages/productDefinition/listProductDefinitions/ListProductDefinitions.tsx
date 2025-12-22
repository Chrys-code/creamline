import type { ListProductDefinitionsProps } from "./ListProductDefinitions.types";
import type { ProductDefinition } from "@/features/domain/productDefinition/types";

import IconButton from "@/shared/components/base/iconButton";
import PageHeader from "@/shared/components/pageHeader";
import PaginatedList from "@/shared/components/paginatedList";
import ProductDefinitionCard from "@/features/domain/productDefinition/components/productDefinitionCard";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";
import { NAVIGATION_ROUTES } from "@/configs/navigation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListProductDefinitions: React.FC = () => {
	const navigate = useNavigate();
	const {
		data: { data, page },
	} = useLoaderData<ListProductDefinitionsProps>();
	const tProductDefinition = useTypedTranslation("productDefinition");

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.productDefinition.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const producerListItem = (item: ProductDefinition) => {
		return (
			<li key={item.uuid} tabIndex={0}>
				<ProductDefinitionCard
					name={item.name}
					type={item.type_label}
					onClick={() =>
						navigate(NAVIGATION_ROUTES.productDefinition.edit.path + item.uuid)
					}
				/>
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={tProductDefinition("list_product_definition.page_title")}
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

export default ListProductDefinitions;
