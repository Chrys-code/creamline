import type React from "react";
import type { PasteurisedMilkCardProps } from "./PasteurisedMilkCard.types.ts";

import styles from "./PasteurisedMilkCard.module.scss";

const PasteurisedMilkCard: React.FC<PasteurisedMilkCardProps> = ({
	title,
	source_storage,
	target_storage,
	datetime,
	temperature,
}: PasteurisedMilkCardProps) => {
	return (
		<div className={styles.container}>
			<p>{title}</p>
			<div>
				<p>{source_storage}</p> <p>{target_storage}</p>
			</div>
			<div>
				<p>{datetime}</p>
				<p>
					{temperature} <sup>o</sup>C
				</p>
			</div>
		</div>
	);
};

export default PasteurisedMilkCard;
