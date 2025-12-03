import type { IntervalTypes } from "../../../../../../../shared/types";

export interface MilkSegmentedPieChartFooterProps {
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	onIntervalChange: (_value: string) => void;
}
