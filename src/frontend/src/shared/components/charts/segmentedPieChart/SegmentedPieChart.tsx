import type React from "react";
import type { SegmentedPieChartProps } from "./SegmentedPieChart.types.ts";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const SegmentedPieChart: React.FC<SegmentedPieChartProps> = ({
	data,
	width,
	nameKey = "name",
	dataKey = "value",
}: SegmentedPieChartProps) => {
	const COLORS = [
		"#FF6384",
		"#36A2EB",
		"#FFCE56",
		"#4BC0C0",
		"#9966FF",
		"#FF9F40",
		"#E7E9ED",
		"#8AFFC1",
		"#FF8ACD",
		"#7D5AFF",
		"#FFB347",
		"#47FFE7",
		"#FF6B6B",
		"#6BFF6B",
		"#6B6BFF",
		"#FF6BFF",
		"#6BFFFF",
		"#FFD56B",
		"#B36BFF",
		"#6BFFB3",
		"#FF6B8A",
		"#8AFF6B",
		"#FFDA6B",
		"#6BC8FF",
		"#FF6BC8",
		"#C8FF6B",
		"#6BFFDA",
		"#DA6BFF",
		"#FF6BDA",
		"#6BDAFF",
		"#FFC36B",
		"#6BFFC3",
		"#C36BFF",
		"#FF6BC3",
		"#6BC3FF",
	];

	return (
		<ResponsiveContainer width={width} height={"100%"} aspect={1}>
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
