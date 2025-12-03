import type { ChartHeaderProps } from "./ChartHeader.types.js";
import styles from "./ChartHeader.module.scss";

import React from "react";

const ChartHeader: React.FC<ChartHeaderProps> = ({ title, actions }: ChartHeaderProps) => {
	return (
		<div className={styles.container}>
			<h2>{title}</h2>
			{actions && <div>{actions}</div>}
		</div>
	);
};

export default ChartHeader;
