import type React from "react";
import type { MilkPieChartProps } from "./MilkPieChart.types.ts";
import { v4 as uuid } from "uuid";

import styles from "./MilkPieChart.module.scss";
import ChartHeader from "../../../../../shared/components/charts/chartHeader/ChartHeader.js";
import { useTypedTranslation } from "../../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";
import SegmentedPieChart from "../../../../../shared/components/charts/segmentedPieChart/SegmentedPieChart.js";

const MilkPieChart: React.FC<MilkPieChartProps> = ({
	chartData,
	intervalOptions,
	selectedInterval,
	onIntervalChange,
}: MilkPieChartProps) => {
	const tMilkCollection = useTypedTranslation("milkCollection");

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tMilkCollection("milk_collection.analytics.producer_segmentation.title")}
			/>
			<SegmentedPieChart
				data={chartData}
				width="40%"
				nameKey="name"
				dataKey="value"
				aspectRatio={1}
			/>
			<div className={styles.chartFooter}>
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
						>
							{option.value}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default MilkPieChart;
