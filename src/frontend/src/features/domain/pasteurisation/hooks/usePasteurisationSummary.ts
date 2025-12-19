import { tTyped } from "@/configs/i18n";

import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";

import pasteurisationClient from "../services/client";

export function usePasteurisationSummary() {
	return useQuery({
		queryKey: ["pasteurisationSummary"],
		queryFn: async () => {
			try {
				const data = await pasteurisationClient.getPasteurisationSummaryAnalytics();
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
		refetchInterval: 10000,
		staleTime: 30000,
	});
}
