import i18n from "../../../../configs/i18n";
import type { Producer } from "../../producer/types";
import type { MilkTrend } from "../types";

export const adaptProducersToProducerOptions = (producers: Producer[]) =>
	producers.map((producer) => ({
		id: producer.uuid,
		value: producer.name,
	}));

export const adaptMilkTrendDateToLanguage = (milkTrends: MilkTrend[]) =>
	milkTrends?.map((milkTrend) => ({
		date: new Date(milkTrend.date).toLocaleString(i18n.language, {
			year: "2-digit",
			month: "numeric",
			day: "numeric",
		}),
		total_liters: milkTrend.total_liters,
	})) || [];
