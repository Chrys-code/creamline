import i18n from "@/configs/i18n";

import type { MilkTrend } from "../types";
import type { IntervalTypes } from "@/shared/types";

import { getLocaleDateFormatForChart } from "@/shared/helpers/getLocaleDateFormat/getLocaleDateFormatForCharts";

/**
 * Used to adapt MilkTrend data by replacing the date with langeuage formatted dates using i18n.
 * @param milkTrends Milk Trend data representing daily volume
 * @param interval Intervals to provide for the date formatter. Example: "day" | "month" | "year"
 * @returns MilkTrend[] with language formatted dates fitting for selected interval
 */
export const adaptMilkTrendDateToLanguage = (
	milkTrends: MilkTrend[],
	interval: IntervalTypes = "day"
) =>
	milkTrends?.map((milkTrend) => ({
		date: new Date(milkTrend.date).toLocaleString(
			i18n.language,
			getLocaleDateFormatForChart(interval)
		),
		total_liters: milkTrend.total_liters,
	})) || [];
