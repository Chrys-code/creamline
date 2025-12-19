import { NAVIGATION_ROUTES } from "@/configs/navigation";

import type { ListMilkCollectionProps } from "./ListMilkCollection.types";

import PageHeader from "@/shared/components/pageHeader";
import IconButton from "@/shared/components/base/iconButton";
import PaginatedMilkList from "@/features/domain/milk/features/paginatedMilkList/PaginatedMilkList";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListMilkCollection: React.FC = () => {
	const navigate = useNavigate();
	const mct = useTypedTranslation("milkCollection");
	const { data, page } = useLoaderData<ListMilkCollectionProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	return (
		<>
			<PageHeader
				title={mct("list_milk_collection.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedMilkList paginatedData={data} currentPage={page} />
		</>
	);
};

export default ListMilkCollection;
