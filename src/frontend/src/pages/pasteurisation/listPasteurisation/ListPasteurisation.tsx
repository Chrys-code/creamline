import type { ListPasteurisationProps } from "./ListPasteurisation.types";
import styles from "./ListPasteurisation.module.scss";

import PageHeader from "../../../shared/components/pageHeader";
import Pagination from "../../../shared/components/pagination";
import IconButton from "../../../shared/components/iconButton";
import Loader from "../../../shared/components/loader";
import PasteurisationCard from "../../../features/domain/pasteurisation/components/pasteurisationCard";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { useDelayedLoader } from "../../../shared/hooks/useDelayedLoader/useDelayedLoader";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

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
	const showLoading = useDelayedLoader(200, 1000);

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const pasteurisedMilkListItems = data.results.map((result) => (
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
	));

	const next = () => navigate(`?page=${page + 1}&page_size=25`);
	const prev = () => navigate(`?page=${page - 1}&page_size=25`);

	const pageSize = import.meta.env.VITE_PAGINATION_PAGE_SIZE;
	const totalPageCount = data.count < pageSize ? 1 : Math.ceil(data.count / pageSize);

	return (
		<>
			<PageHeader
				title={pt("list_pasteurised_milk.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			{showLoading && <Loader />}
			{!showLoading && <ul className={styles.list}>{pasteurisedMilkListItems}</ul>}
			<div className={styles.floatingMenu}>
				<Pagination
					isFirst={data.previous === null}
					isLast={data.next === null}
					onDecrease={prev}
					onIncrease={next}
				>
					<p>
						{page} / {totalPageCount}
					</p>
				</Pagination>
			</div>
		</>
	);
};

export default ListPasteurisation;
