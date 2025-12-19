import type { IntervalTypes } from "@/shared/types";

export interface FilterState {
	startDate: string;
	endDate: string;
	interval: IntervalTypes;
	producer: "all" | string;
}

export interface UseMilkTimeSeriesProps {
	interval: IntervalTypes;
	producer_uuid: string;
	start_date?: string;
	end_date?: string;
}
