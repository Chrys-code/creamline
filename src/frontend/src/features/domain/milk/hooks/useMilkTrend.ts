import type { IntervalTypes } from "../types";

import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../services/client";
import { adaptMilkTrendDateToLanguage } from "../adapters";

export function useMilkTrend(
	interval: IntervalTypes = "day",
	range: number,
	producer_uuid?: string
) {
	return useQuery({
		queryKey: ["milkTrend", interval, range, producer_uuid],
		queryFn: async () =>
			adaptMilkTrendDateToLanguage(
				await milkClient.getMilkTrend({ queries: { interval, range, producer_uuid } })
			),
		refetchInterval: 10000,
		staleTime: 5000,
	});
}
