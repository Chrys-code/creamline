import type { IntervalTypes } from "../types";

import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../services/client";
import { adaptMilkTrendDateToLanguage } from "../adapters";

export function useMilkTrend(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["milkTrend", interval],
		queryFn: async () =>
			adaptMilkTrendDateToLanguage(await milkClient.getMilkTrend({ queries: { interval } })),
		refetchInterval: 10000,
		staleTime: 5000,
	});
}
