import type React from "react";
import type { PasteurisationSegmentedPieChartFooterProps } from "./PasteurisationSegmentedPieChartFooter.types.js";
import styles from "./PasteurisationSegmentedPieChartFooter.module.scss";

import { v4 as uuid } from "uuid";

const MilkSegmentedPieChartFooter: React.FC<PasteurisationSegmentedPieChartFooterProps> = ({
	intervalOptions,
	selectedInterval,
	isDisabled,
	onIntervalChange,
}: PasteurisationSegmentedPieChartFooterProps) => {
	return (
		<div className={styles.container}>
			{intervalOptions.map((option) => {
				const chipStyle =
					selectedInterval === option.id
						? `${styles.optionChip} ${styles.selected}`
						: styles.optionChip;
				return (
					<button
						key={uuid()}
						onClick={() => onIntervalChange(option.id)}
						className={chipStyle}
						type="button"
						disabled={isDisabled}
					>
						{option.value}
					</button>
				);
			})}
		</div>
	);
};

export default MilkSegmentedPieChartFooter;
