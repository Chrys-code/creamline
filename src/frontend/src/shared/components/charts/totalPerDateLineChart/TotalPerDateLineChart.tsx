import type React from "react";
import type { TotalPerDateLineChartProps } from "./TotalPerDateLineChart.types.js";

import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const TotalPerDateLineChart: React.FC<TotalPerDateLineChartProps> = ({
	data,
	width,
	aspectRatio = 1.618,
	xAxisDataYey = "date",
	yAsixDatKey = "total",
	maxHeight = 300,
	withAxis,
}: TotalPerDateLineChartProps) => {
	return (
		<ResponsiveContainer width={width} aspect={aspectRatio} maxHeight={maxHeight}>
			<AreaChart data={data}>
				<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					<stop offset="10%" stopColor="#7e43cb" stopOpacity={0.9} />
					<stop offset="95%" stopColor="#7e43cb" stopOpacity={0} />
				</linearGradient>
				<XAxis dataKey={xAxisDataYey} hide={!withAxis} />
				<YAxis hide={!withAxis} />
				<Tooltip />
				<Area
					type="monotone"
					dataKey={yAsixDatKey}
					stroke="#e1c8ff"
					fill="url(#colorUv)"
					strokeWidth={2}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default TotalPerDateLineChart;
