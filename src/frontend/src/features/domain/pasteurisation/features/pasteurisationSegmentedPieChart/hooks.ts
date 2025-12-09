import { useQuery } from "@tanstack/react-query";
import type { IntervalTypes } from "../../../../../shared/types";
import pasteurisationClient from "../../services/client";

export function usePasteurisationSegmentedByProducers(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["pasteurisationSegmentedByPasteur", interval],
		queryFn: async () =>
			await pasteurisationClient.getPasteurisationSegmentedByPasteurs({
				queries: { interval },
			}),
		refetchInterval: 60000,
		staleTime: 30000,
	});
}
