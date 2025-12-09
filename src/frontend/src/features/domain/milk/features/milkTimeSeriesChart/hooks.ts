import type { IntervalTypes } from "../../../../../shared/types";

import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../../services/client";
import { adaptMilkTrendDateToLanguage } from "../../adapters";

export function useMilkTimeSeries(
	interval: IntervalTypes = "week",
	start_date?: string,
	end_date?: string,
	producer_uuid?: string
) {
	return useQuery({
		queryKey: ["milkTrend", start_date, end_date, interval, producer_uuid],
		queryFn: async () =>
			adaptMilkTrendDateToLanguage(
				await milkClient.getMilkTrend({
					queries: { interval, start_date, end_date, producer_uuid },
				}),
				interval
			),
		refetchInterval: 60000,
		staleTime: 30000,
		refetchOnMount: "always",
	});
}
