import type React from "react";
import type { MilkPieChartProps } from "./MilkPieChart.types.ts";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { v4 as uuid } from "uuid";

import styles from "./MilkPieChart.module.scss";
import ChartHeader from "../../../../../shared/components/charts/chartHeader/ChartHeader.js";
import { useTypedTranslation } from "../../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";

const MilkPieChart: React.FC<MilkPieChartProps> = ({
	chartData,
	intervalOptions,
	selectedInterval,
	onIntervalChange,
}: MilkPieChartProps) => {
	const tMilkCollection = useTypedTranslation("milkCollection");

	const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tMilkCollection("milk_collection.analytics.producer_segmentation.title")}
			/>
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<PieChart responsive>
					<Tooltip />
					<Pie
						data={chartData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={"100%"}
						innerRadius={"40%"}
					>
						{chartData?.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
			<div className={styles.chartFooter}>
				{intervalOptions.map((option) => {
					const chipStyle =
						selectedInterval === option.value
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
