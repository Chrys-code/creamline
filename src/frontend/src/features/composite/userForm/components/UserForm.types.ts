import type { User } from "../../../../features/domain/user/types";

export interface UserFormProps {
	user: User;
	userGroups: { id: number; value: string }[];
}
