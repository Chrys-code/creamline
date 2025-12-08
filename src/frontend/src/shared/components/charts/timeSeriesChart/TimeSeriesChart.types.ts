export interface TimeSeriesChartProps {
	data: {
		[key: string]: string | number;
	}[];
	width: number | `${number}%`;
	height?: number | `${number}%`;
	maxHeight?: number;
	aspectRatio?: number;
	xAxisDataYey?: string;
	yAsixDatKey?: string;
	withAxis?: boolean;
}
