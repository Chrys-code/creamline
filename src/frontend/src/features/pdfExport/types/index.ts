import type { IntervalTypes } from "../../../shared/types";

export interface TimeSeriesExportParams {
	start_date: string;
	end_date: string;
	interval: IntervalTypes;
	producer_uuid: string | "all";
}
