import type { PaginatedUserList } from "../../../features/domain/user/types";

export interface UserListProps {
	data: {
		data: PaginatedUserList;
		page: number;
	};
	userGroups: { id: number; name: string }[];
}
