import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../services/client";

export function useMilkSummary() {
	return useQuery({
		queryKey: ["milkSummary"],
		queryFn: async () => milkClient.getGetMilkSummaryAnalytics(),
		refetchInterval: 10000,
		staleTime: 5000,
	});
}
