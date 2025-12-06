import type { UserGroup } from "../../../features/domain/user/features/userGroups/types";
import type { PaginatedUserList } from "../../../features/domain/user/types";

export interface UserListProps {
	data: {
		data: PaginatedUserList;
		page: number;
	};
	userGroups: UserGroup[];
}
