import type React from "react";
import type { ProductDefinitionCardProps } from "./ProductDefinitionCard.types.ts";

import styles from "./ProductDefinitionCard.module.scss";

const ProductDefinitionCard: React.FC<ProductDefinitionCardProps> = ({
	name,
	type,
	onClick,
}: ProductDefinitionCardProps) => {
	return (
		<div className={styles.container} onClick={onClick}>
			<p>{name}</p>
			<div>
				<p>{type}</p>
			</div>
		</div>
	);
};

export default ProductDefinitionCard;
