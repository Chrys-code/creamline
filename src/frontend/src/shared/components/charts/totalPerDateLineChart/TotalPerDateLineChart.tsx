import type React from "react";
import type { TotalPerDateLineChartProps } from "./TotalPerDateLineChart.types.js";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TotalPerDateLineChart: React.FC<TotalPerDateLineChartProps> = ({
	data,
	width,
	aspectRatio = 1.618,
	xAxisDataYey = "date",
	yAsixDatKey = "total",
	maxHeight = 300,
}: TotalPerDateLineChartProps) => {
	return (
		<ResponsiveContainer width={width} aspect={aspectRatio} maxHeight={maxHeight}>
			<LineChart data={data} responsive>
				<XAxis dataKey={xAxisDataYey} />
				<YAxis />
				<Tooltip />
				<Line type="monotone" dataKey={yAsixDatKey} stroke="#8884d8" strokeWidth={2} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default TotalPerDateLineChart;
