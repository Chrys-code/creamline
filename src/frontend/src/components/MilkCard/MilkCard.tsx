import type React from "react";
import type { MilkCardProps } from "./MilkCard.types.js";

import styles from "./MilkCard.module.scss";

const MilkCard: React.FC<MilkCardProps> = ({ title, storages, datetime }: MilkCardProps) => {
	return (
		<div className={styles.container}>
			<div>
				<h3>{title}</h3>
				<span>{datetime}</span>
			</div>
			<div>
				<p>{storages}</p>
			</div>
		</div>
	);
};

export default MilkCard;
