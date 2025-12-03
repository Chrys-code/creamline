import type { IntervalTypes } from "../../../../../shared/types";

export interface MilkPieChartProps {
	chartData: { name: string; value: number }[];
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	onIntervalChange: (_value: string) => void;
}
