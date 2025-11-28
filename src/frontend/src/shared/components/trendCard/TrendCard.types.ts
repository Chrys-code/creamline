export interface TrendCardProps {
	title: string;
	value: string | number;
	unit: string;
	percentageChange?: number;
}

export type Trend = "increasing" | "decreasing" | "stagnating";
