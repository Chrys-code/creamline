export interface TimeSeriesChartProps {
	data: {
		[key: string]: string | number;
	}[];
	width: number | `${number}%`;
	aspectRatio?: number;
	xAxisDataYey?: string;
	yAsixDatKey?: string;
	maxHeight?: number;
	withAxis?: boolean;
}
