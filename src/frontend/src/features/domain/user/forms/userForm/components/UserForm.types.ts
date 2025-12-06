import type { User } from "../../../types";

export interface UserFormProps {
	user: User;
	userGroups: { id: string; value: string }[];
}
