import type { IntervalTypes } from "@/shared/types";

export interface MilkSegmentedPieChartFooterProps {
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	isDisabled?: boolean;
	onIntervalChange: (_value: string) => void;
}
