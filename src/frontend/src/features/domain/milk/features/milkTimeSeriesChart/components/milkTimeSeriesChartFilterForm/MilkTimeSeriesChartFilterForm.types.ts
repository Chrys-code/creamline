import type { FilterState } from "../../types";

export interface MilkTimeSeriesChartFilterFormProps {
	isOpen?: boolean;
	isDisabled?: boolean;
	chartFilterState: FilterState;
	onClose: () => void;
	onSubmit: (_data: FilterState) => void;
	intervalOptions: { id: string; value: string }[];
	producerOptions: { id: string; value: string }[];
}
