import type React from "react";
import type { PasteurCardProps } from "./PasteurCard.types";

import styles from "./PasteurCard.module.scss";

const PasteurCard: React.FC<PasteurCardProps> = ({ name, onClick }: PasteurCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
		</div>
	);
};

export default PasteurCard;
