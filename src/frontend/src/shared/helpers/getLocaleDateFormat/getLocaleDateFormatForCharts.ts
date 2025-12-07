import type { IntervalTypes } from "../../types";

/**
 * Used to format dates for selected chart intervals.
 * @param interval Example: "day" | "week" | "month" | "quarter" | "year"
 * @returns Intl.DateTimeFormatOptions
 */
export const getLocaleDateFormatForChart = (interval: IntervalTypes) => {
	switch (interval) {
		case "day":
			return {
				year: "2-digit",
				month: "numeric",
				day: "numeric",
			} as Intl.DateTimeFormatOptions;

		case "month":
			return {
				year: "2-digit",
				month: "numeric",
			} as Intl.DateTimeFormatOptions;

		case "quarter":
			return {
				year: "2-digit",
				month: "numeric",
			} as Intl.DateTimeFormatOptions;

		case "year":
			return {
				year: "2-digit",
			} as Intl.DateTimeFormatOptions;

		default:
			return {
				year: "2-digit",
				month: "numeric",
				day: "numeric",
			} as Intl.DateTimeFormatOptions;
	}
};
