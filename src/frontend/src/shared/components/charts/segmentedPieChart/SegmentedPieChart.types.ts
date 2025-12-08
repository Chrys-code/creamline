export interface SegmentedPieChartProps {
	data: {
		[key: string]: string | number;
	}[];
	width: number | `${number}%`;
	nameKey: string;
	dataKey: string;
}
