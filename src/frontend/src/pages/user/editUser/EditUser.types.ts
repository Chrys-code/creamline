import type { User } from "../../../api/types";

export interface EditUserProps {
	selectedItem: User;
	userGroups: { id: number; value: string }[];
}
