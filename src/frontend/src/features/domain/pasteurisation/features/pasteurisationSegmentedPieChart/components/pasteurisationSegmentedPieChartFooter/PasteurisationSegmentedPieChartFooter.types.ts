import type { IntervalTypes } from "../../../../../../../shared/types";

export interface PasteurisationSegmentedPieChartFooterProps {
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	isDisabled?: boolean;
	onIntervalChange: (_value: string) => void;
}
