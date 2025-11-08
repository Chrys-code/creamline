import type { User } from "../../../api/types.js";
import type { UserListProps } from "./UserList.types.js";
import styles from "./UserList.module.scss";

import PageHeader from "../../../components/pageHeader/index.js";
import Pagination from "../../../components/pagination/index.js";
import UserCard from "../../../components/userCard/index.js";
import IconButton from "../../../components/iconButton/index.js";
import Loader from "../../../components/loader/index.js";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { useDelayedLoader } from "../../../lib/hooks/useDelayedLoader.js";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const UserList: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { data, page } = useLoaderData<UserListProps>();
	const showLoading = useDelayedLoader(200, 1000);

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const userListItem = data.results.map((result: User) => (
		<li key={result.uuid}>
			<UserCard
				name={`${result.profile?.first_name} ${result.profile?.last_name}`}
				groups={result.groups}
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
				title={t("user_list.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			{showLoading && <Loader />}
			{!showLoading && <ul className={styles.list}>{userListItem}</ul>}
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

export default UserList;
