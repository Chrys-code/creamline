export interface SegmentedPieChartProps {
	data: {
		[key: string]: string | number;
	}[];
	width: number | `${number}%`;
	aspectRatio?: number;
	nameKey: string;
	dataKey: string;
	maxHeight?: number;
}
