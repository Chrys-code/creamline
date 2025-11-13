import type React from "react";
import type { UserCardProps } from "./UserCard.types.ts";

import styles from "./UserCard.module.scss";

const UserCard: React.FC<UserCardProps> = ({ name, groups, onClick }: UserCardProps) => {
	const renderGroups = (groups: string[]) => {
		if (!groups || !groups.length) return null;
		return groups.join(" ");
	};

	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
			<ul></ul>
			<p>{renderGroups(groups)}</p>
		</div>
	);
};

export default UserCard;
