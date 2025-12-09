import type { IntervalTypes } from "../../../../../shared/types";

import { useQuery } from "@tanstack/react-query";
import pasteurisationClient from "../../services/client";
import { adaptPasteurisationTimeSeriesDateToLanguage } from "../../adapters";

export function usePasteurisationTimeSeries(
	interval: IntervalTypes = "week",
	start_date?: string,
	end_date?: string,
	pasteur_uuid?: string
) {
	return useQuery({
		queryKey: ["milkTrend", start_date, end_date, interval, pasteur_uuid],
		queryFn: async () =>
			adaptPasteurisationTimeSeriesDateToLanguage(
				await pasteurisationClient.getPasteurisationTimeSeriesAnalytics({
					queries: { interval, start_date, end_date, pasteur_uuid },
				}),
				interval
			),
		refetchInterval: 60000,
		staleTime: 30000,
		refetchOnMount: "always",
	});
}
