import type { IntervalTypes } from "../../../../shared/types";
import type { PasteurisationTimeSeries } from "../types";

import i18n from "../../../../configs/i18n";
import { getLocaleDateFormatForChart } from "../../../../shared/helpers/getLocaleDateFormat/getLocaleDateFormatForCharts";

/**
 * Used to adapt PasteurisationTimeSeries data by replacing the date with langeuage formatted dates using i18n.
 * @param pasteuristaionTimeSeriesData Pasteurisation data aggregated by selected interval
 * @param interval Intervals to provide for the date formatter. Example: "day" | "month" | "year"
 * @returns PasteurisationTimeSeries[] with language formatted dates fitting for selected interval
 */
export const adaptPasteurisationTimeSeriesDateToLanguage = (
	pasteuristaionTimeSeriesData: PasteurisationTimeSeries[],
	interval: IntervalTypes = "day"
) =>
	pasteuristaionTimeSeriesData?.map((milkTrend) => ({
		date: new Date(milkTrend.date).toLocaleString(
			i18n.language,
			getLocaleDateFormatForChart(interval)
		),
		total_liters: milkTrend.total_liters,
	})) || [];
