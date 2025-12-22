export interface UserCardProps {
	userId: string;
	name: string;
	groups: string[];
	isActive?: boolean;
	onClick: () => void;
}
