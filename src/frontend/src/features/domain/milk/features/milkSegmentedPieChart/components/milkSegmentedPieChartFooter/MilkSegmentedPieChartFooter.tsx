import type React from "react";
import type { MilkSegmentedPieChartFooterProps } from "./MilkSegmentedPieChartFooter.types.ts";
import styles from "./MilkSegmentedPieChartFooter.module.scss";

import { v4 as uuid } from "uuid";

const MilkSegmentedPieChartFooter: React.FC<MilkSegmentedPieChartFooterProps> = ({
	intervalOptions,
	selectedInterval,
	isDisabled,
	onIntervalChange,
}: MilkSegmentedPieChartFooterProps) => {
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
