import type { UserListProps } from "./ListUser.types";
import type { User } from "../../../features/domain/user/types";

import PageHeader from "../../../shared/components/pageHeader";
import PaginatedList from "../../../shared/components/paginatedList";
import UserCard from "../../../features/domain/user/components/userCard";
import IconButton from "../../../shared/components/base//iconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";
import type { UserGroup } from "../../../features/domain/user/features/userGroups/types";

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

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.user.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const getUserGroupNames = (
		allUserGroups: UserGroup[],
		activeUserGroupIds: string[]
	): string[] => {
		const activeUserGroupObjects = allUserGroups.filter((userGroup) =>
			activeUserGroupIds.includes(userGroup.uuid)
		);

		return activeUserGroupObjects.map((obj) => obj.name);
	};

	const userListItem = (result: User) => {
		return (
			<li key={result.uuid} tabIndex={0}>
				<UserCard
					name={`${result.profile?.first_name} ${result.profile?.last_name}`}
					groups={getUserGroupNames(userGroups, result.groups)}
					onClick={() => navigate(NAVIGATION_ROUTES.user.edit.path + result.uuid)}
				/>
			</li>
		);
	};

	return (
		<>
			<PageHeader
				title={tUser("list_users.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<PaginatedList
				items={data.results}
				itemCount={data.count}
				currentPage={page}
				nextPage={data.next}
				previousPage={data.previous}
				itemRenderer={userListItem}
			/>
		</>
	);
};

export default ListUser;
