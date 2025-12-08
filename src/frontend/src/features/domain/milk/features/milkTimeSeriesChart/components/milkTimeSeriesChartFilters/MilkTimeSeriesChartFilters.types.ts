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
	producerOptions: { id: string; value: string }[];
	selectedProducer: string | undefined;
	onProducerChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}
