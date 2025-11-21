import type React from "react";
import type { ProducerCardProps } from "./ProducerCard.types.ts";

import styles from "./ProducerCard.module.scss";

const ProducerCard: React.FC<ProducerCardProps> = ({
	name,
	address,
	onClick,
}: ProducerCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
			<div>
				<p>{address}</p>
			</div>
		</div>
	);
};

export default ProducerCard;
