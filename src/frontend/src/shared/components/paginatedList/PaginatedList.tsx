import type { PaginatedListProps } from "./PaginatedList.types";
import styles from "./PaginatedList.module.scss";

import Pagination from "../pagination/";
import Loader from "../base/loader/Loader";

import { useNavigate } from "react-router";
import { useDelayedLoader } from "../../hooks/useDelayedLoader/useDelayedLoader";

function PaginatedList<T>({
	items,
	itemCount,
	currentPage,
	nextPage,
	previousPage,
	itemRenderer,
}: PaginatedListProps<T>) {
	const navigate = useNavigate();
	const showLoading = useDelayedLoader(200, 1000);

	const pageSize = import.meta.env.VITE_PAGINATION_PAGE_SIZE;
	const totalPageCount = itemCount < pageSize ? 1 : Math.ceil(itemCount / pageSize);

	const next = () => navigate(`?page=${currentPage + 1}`);
	const prev = () => navigate(`?page=${currentPage - 1}`);

	const renderItems = () => items?.map(itemRenderer) ?? null;

	return (
		<>
			{showLoading && <Loader />}
			{!showLoading && <ul className={styles.list}>{renderItems()}</ul>}
			<div className={styles.floatingMenu}>
				<Pagination
					isFirst={previousPage === null}
					isLast={nextPage === null}
					onDecrease={prev}
					onIncrease={next}
				>
					<p>
						{currentPage} / {totalPageCount}
					</p>
				</Pagination>
			</div>
		</>
	);
}

export default PaginatedList;
