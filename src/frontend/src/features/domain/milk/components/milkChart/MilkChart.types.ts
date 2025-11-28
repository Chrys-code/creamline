import type React from "react";
import type { IntervalTypes, MilkTrend } from "../../types";

export interface MilkChartProps {
	chartData: MilkTrend[];
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	onIntervalChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}
