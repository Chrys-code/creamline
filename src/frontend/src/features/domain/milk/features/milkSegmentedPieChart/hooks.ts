import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../../services/client";
import type { IntervalTypes } from "../../../../../shared/types";

export function useMilkSegmentedByProducers(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["milkSegmentedByProducer", interval],
		queryFn: async () =>
			await milkClient.getMilkAnalyticsSegmentedByProducers({
				queries: { interval },
			}),
		refetchInterval: 60000,
		staleTime: 30000,
		refetchOnMount: "always",
	});
}
