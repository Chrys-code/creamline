import type { User } from "../../../features/domain/user/types";

export interface EditUserProps {
	selectedItem: User;
	userGroups: { id: string; value: string }[];
}
