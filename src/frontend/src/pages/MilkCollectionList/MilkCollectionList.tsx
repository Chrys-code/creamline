import type React from "react";
import type { MilkCollectionListProps } from "./MilkCollectionList.types";
import styles from "./MilkCollectionList.module.scss";

import PageHeader from "../../components/PageHeader";
import Pagination from "../../components/Pagination/Pagination";
import MilkCard from "../../components/MilkCard";

import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigation, useNavigate } from "react-router";

const MilkCollectionList: React.FC = () => {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { data, page } = useLoaderData<MilkCollectionListProps>();

	const milkListItems = data.results.map((result) => (
		<MilkCard
			key={result.uuid}
			title={result.producer_name}
			storages={result.storage_name}
			datetime={new Date(result.created_at).toLocaleDateString()}
		/>
	));

	const isLoading = navigation.state === "loading";

	const next = () => navigate(`?page=${page + 1}&page_size=25`);
	const prev = () => navigate(`?page=${page - 1}&page_size=25`);

	const pageSize = import.meta.env.VITE_PAGINATION_PAGE_SIZE;
	const totalPageCount = data.count < pageSize ? 1 : data.count / pageSize;

	return (
		<>
			<PageHeader
				title={t("milk_collection_list.page_title")}
				onNavigateBack={() => navigate("/")}
			/>
			{isLoading && <p>Loading ...</p>}
			{milkListItems}
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

export default MilkCollectionList;
