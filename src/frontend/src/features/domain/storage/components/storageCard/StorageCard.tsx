import type React from "react";
import type { StorageCardProps } from "./StorageCard.types.ts";

import styles from "./StorageCard.module.scss";

const StorageCard: React.FC<StorageCardProps> = ({ name, type, onClick }: StorageCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
			<div>
				<span>{type}</span>
			</div>
		</div>
	);
};

export default StorageCard;
