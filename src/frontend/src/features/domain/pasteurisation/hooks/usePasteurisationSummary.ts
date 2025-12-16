import { useQuery } from "@tanstack/react-query";
import pasteurisationClient from "../services/client";

export function usePasteurisationSummary() {
	return useQuery({
		queryKey: ["pasteurisationSummary"],
		queryFn: async () => pasteurisationClient.getPasteurisationSummaryAnalytics(),
		refetchInterval: 10000,
		staleTime: 5000,
	});
}
