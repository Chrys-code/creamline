import type { FilterState } from "../../types";

export interface PasteurisationTimeSeriesChartFilterFormProps {
	isOpen?: boolean;
	isDisabled?: boolean;
	chartFilterState: FilterState;
	onClose: () => void;
	onSubmit: (_data: FilterState) => void;
	intervalOptions: { id: string; value: string }[];
	pasteurOptions: { id: string; value: string }[];
}
