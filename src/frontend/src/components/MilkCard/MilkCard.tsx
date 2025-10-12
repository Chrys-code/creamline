import type React from "react";
import type { MilkCardProps } from "./MilkCard.types.js";

import styles from "./MilkCard.module.scss";

const MilkCard: React.FC<MilkCardProps> = ({ title, storages, datetime }: MilkCardProps) => {
	return (
		<div className={styles.container}>
			<p>{title}</p>
			<div>
				<p>{storages}</p>
				<span>{datetime}</span>
			</div>
		</div>
	);
};

export default MilkCard;
