import type { IntervalTypes } from "../../../shared/types";

export interface MilkTimeSeriesExportParams {
	start_date: string;
	end_date: string;
	interval: IntervalTypes;
	producer_uuid: string | "all";
}

export interface PasteurisationTimeSeriesExportParams {
	start_date: string;
	end_date: string;
	interval: IntervalTypes;
	pasteur_uuid: string | "all";
}
