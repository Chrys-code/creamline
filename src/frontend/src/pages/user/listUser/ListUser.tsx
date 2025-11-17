import type { UserListProps } from "./ListUser.types";
import type { User } from "../../../features/domain/user/types";
import styles from "./ListUser.module.scss";

import PageHeader from "../../../shared/components/pageHeader";
import Pagination from "../../../shared/components/pagination";
import IconButton from "../../../shared/components/iconButton";
import UserCard from "../../../features/domain/user/components/userCard";
import Loader from "../../../shared/components/loader";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useDelayedLoader } from "../../../shared/hooks/useDelayedLoader/useDelayedLoader";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const ListUser: React.FC = () => {
	const navigate = useNavigate();
	const tUser = useTypedTranslation("users");

	const {
		data: { data, page },
		userGroups,
	} = useLoaderData<UserListProps>();
	const showLoading = useDelayedLoader(200, 1000);

	const headerActionElement = (
		<IconButton onClick={() => navigate("create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const getUserGroupNames = (
		allUserGroups: { id: number; name: string }[],
		activeUserGroups: number[]
	): string[] => {
		const activeUserGroupObjects = allUserGroups.filter((userGroup) =>
			activeUserGroups.includes(userGroup.id)
		);

		return activeUserGroupObjects.map((obj) => obj.name);
	};

	const userListItem = data.results.map((result: User) => {
		return (
			<li key={result.uuid} tabIndex={0}>
				<UserCard
					name={`${result.profile?.first_name} ${result.profile?.last_name}`}
					groups={getUserGroupNames(userGroups, result.groups)}
					onClick={() => navigate(`edit/${result.uuid}`)}
				/>
			</li>
		);
	});

	const next = () => navigate(`?page=${page + 1}&page_size=25`);
	const prev = () => navigate(`?page=${page - 1}&page_size=25`);

	const pageSize = import.meta.env.VITE_PAGINATION_PAGE_SIZE;
	const totalPageCount = data.count < pageSize ? 1 : Math.ceil(data.count / pageSize);

	return (
		<>
			<PageHeader
				title={tUser("list_users.page_title")}
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

export default ListUser;
