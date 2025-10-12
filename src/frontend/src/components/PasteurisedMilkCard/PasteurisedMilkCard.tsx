import type React from "react";
import type { PasteurisedMilkCardProps } from "./PasteurisedMilkCard.types.ts";

import styles from "./PasteurisedMilkCard.module.scss";

const PasteurisedMilkCard: React.FC<PasteurisedMilkCardProps> = ({
	title,
	storages,
	datetime,
	temperature,
}: PasteurisedMilkCardProps) => {
	return (
		<div className={styles.container}>
			<div>
				<h3>{title}</h3> <span>{datetime}</span>
			</div>
			<div>
				<p>{storages}</p> <span>{temperature}</span>
			</div>
		</div>
	);
};

export default PasteurisedMilkCard;
