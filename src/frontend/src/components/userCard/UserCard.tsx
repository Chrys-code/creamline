import type React from "react";
import type { UserCardProps } from "./UserCard.types.ts";

import styles from "./UserCard.module.scss";

const UserCard: React.FC<UserCardProps> = ({ name, groups, onClick }: UserCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
			<p>{groups}</p>
		</div>
	);
};

export default UserCard;
