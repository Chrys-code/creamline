import type { ListPasteurisationProps } from "./ListPasteurisation.types";
import styles from "./ListPasteurisation.module.scss";

import PageHeader from "../../../components/pageHeader";
import Pagination from "../../../components/pagination";
import PasteurisedMilkCard from "../../../components/pasteurisedMilkCard";
import IconButton from "../../../components/iconButton";
import Loader from "../../../components/loader";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { useDelayedLoader } from "../../../lib/hooks/useDelayedLoader.js";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListPasteurisation: React.FC = () => {
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const { data, page } = useLoaderData<ListPasteurisationProps>();
	const showLoading = useDelayedLoader(200, 1000);

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const pasteurisedMilkListItems = data.results.map((result) => (
		<li key={result.uuid}>
			<PasteurisedMilkCard
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
				title={t("pasteurised_milk_list.page_title")}
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
