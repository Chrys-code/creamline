import type { PaginatedUserListData } from "../../../api/types";

export interface UserListProps {
	data: {
		data: PaginatedUserListData;
		page: number;
	};
	userGroups: { id: number; name: string }[];
}
