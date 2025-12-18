import type { IntervalTypes } from "../../../../../shared/types";

export interface FilterState {
	startDate: string;
	endDate: string;
	interval: IntervalTypes;
	pasteur: "all" | string;
}

export interface UsePasteurisationTimeSeriesProps {
	interval: IntervalTypes;
	pasteur_uuid: string;
	start_date?: string;
	end_date?: string;
}
