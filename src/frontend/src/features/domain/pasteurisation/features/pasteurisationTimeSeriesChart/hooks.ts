import { useQuery } from "@tanstack/react-query";
import pasteurisationClient from "../../services/client";
import { adaptPasteurisationTimeSeriesDateToLanguage } from "../../adapters";
import { tTyped } from "../../../../../configs/i18n";
import { toast } from "react-toastify";
import type { UsePasteurisationTimeSeriesProps } from "./types";

export function usePasteurisationTimeSeries({
	interval,
	start_date,
	end_date,
	pasteur_uuid,
}: UsePasteurisationTimeSeriesProps) {
	return useQuery({
		queryKey: ["milkTrend", start_date, end_date, interval, pasteur_uuid],
		queryFn: async () => {
			try {
				const data = adaptPasteurisationTimeSeriesDateToLanguage(
					await pasteurisationClient.getPasteurisationTimeSeriesAnalytics({
						queries: { interval, start_date, end_date, pasteur_uuid },
					}),
					interval
				);
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
