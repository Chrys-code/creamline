import type React from "react";
import type { SegmentedPieChartProps } from "./SegmentedPieChart.types.ts";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const SegmentedPieChart: React.FC<SegmentedPieChartProps> = ({
	data,
	width,
	aspectRatio = 1.618,
	nameKey = "name",
	dataKey = "value",
	maxHeight = 300,
}: SegmentedPieChartProps) => {
	const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

	return (
		<ResponsiveContainer
			width={width}
			height={"100%"}
			maxHeight={maxHeight}
			aspect={aspectRatio}
		>
			<PieChart responsive>
				<Tooltip />
				<Pie
					data={data}
					nameKey={nameKey}
					dataKey={dataKey}
					cx="50%"
					cy="50%"
					outerRadius={"100%"}
					innerRadius={"40%"}
				>
					{data?.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default SegmentedPieChart;
