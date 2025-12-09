import type React from "react";
import type { IntervalTypes } from "../../../../../../../shared/types";

export interface MilkTimeSeriesChartFiltersProps {
	isOpen?: boolean;
	isDisabled?: boolean;
	selectedStartDate: string;
	onStartDateChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedEndDate: string;
	onEndDateChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
	intervalOptions: { id: string; value: string }[];
	selectedInterval: IntervalTypes;
	onIntervalChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
	pasteurOptions: { id: string; value: string }[];
	selectedPasteur: string | undefined;
	onPasteurChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}
