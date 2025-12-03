import i18n from "../../../../configs/i18n";
import { getLocaleDateFormatForChart } from "../../../../shared/helpers/getLocaleDateFormat/getLocaleDateFormatForCharts";
import type { IntervalTypes } from "../../../../shared/types";
import type { Producer } from "../../producer/types";
import type { MilkTrend } from "../types";

export const adaptProducersToProducerOptions = (producers: Producer[]) =>
	producers.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	}));

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
