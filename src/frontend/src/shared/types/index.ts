export type IntervalTypes = "day" | "week" | "month" | "quarter" | "year";

export type NAVIGATION_ROUTE = {
	path?: string;
	title?: string;
	requiredRoles: string[];
	[key: string]: any;
};
