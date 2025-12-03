import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../services/client";
import type { IntervalTypes } from "../../../../shared/types";

export function useMilkSegmentedByProducers(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["milkSegmentedByProducer", interval],
		queryFn: async () =>
			await milkClient.getMilkSegmentedByProducers({
				queries: { interval },
			}),
		refetchInterval: 10000,
		staleTime: 5000,
	});
}
