import { NAVIGATION_ROUTES } from "@/configs/navigation";

import type { ListPasteurisationProps } from "./ListPasteurisation.types";

import PageHeader from "@/shared/components/pageHeader";
import IconButton from "@/shared/components/base/iconButton";
import PaginatedPasteurisationList from "@/features/domain/pasteurisation/features/paginatedPasteurisationList/PaginatedPasteurisationList";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListPasteurisation: React.FC = () => {
	const navigate = useNavigate();
	const pt = useTypedTranslation("pasteurisation");
	const { data, page } = useLoaderData<ListPasteurisationProps>();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.pasteuriation.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	return (
		<>
			<PageHeader
				title={pt("list_pasteurisation.page_title")}
				onNavigateBack={() => navigate(-1)}
				actionElement={headerActionElement}
			/>
			<PaginatedPasteurisationList paginatedData={data} currentPage={page} />
		</>
	);
};

export default ListPasteurisation;
