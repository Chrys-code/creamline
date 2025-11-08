import type { PaginatedUserListData } from "../../../api/types";

export interface UserListProps {
	data: PaginatedUserListData;
	page: number;
}
