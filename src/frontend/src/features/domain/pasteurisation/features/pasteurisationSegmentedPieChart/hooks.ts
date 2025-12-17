import { useQuery } from "@tanstack/react-query";
import type { IntervalTypes } from "../../../../../shared/types";
import pasteurisationClient from "../../services/client";
import { tTyped } from "../../../../../configs/i18n";
import { toast } from "react-toastify";

export function usePasteurisationSegmentedByProducers(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["pasteurisationSegmentedByPasteur", interval],
		queryFn: async () => {
			try {
				const data =
					await pasteurisationClient.getPasteurisationAnalyticsSegmentedByPasteurs({
						queries: { interval },
					});
				return data;
			} catch (err: any) {
				if (err.response) {
					const tNetworkError = tTyped("errors");
					const status = err.response.status || 500;
					const message =
						status !== 500
							? err.response.data.detail
							: tNetworkError("error_codes.500");

					toast.error(message);
					return;
				}
				toast.error("Something went wrong...");
			}
		},
		refetchInterval: 60000,
		staleTime: 30000,
		refetchOnMount: "always",
	});
}
