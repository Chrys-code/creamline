import type { UseMilkTimeSeriesProps } from "./types";

import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../../services/client";
import { adaptMilkTrendDateToLanguage } from "../../adapters";
import { toast } from "react-toastify";
import { tTyped } from "../../../../../configs/i18n";

export function useMilkTimeSeries({
	interval = "week",
	start_date,
	end_date,
	producer_uuid,
}: UseMilkTimeSeriesProps) {
	return useQuery({
		queryKey: ["milkTrend", start_date, end_date, interval, producer_uuid],
		queryFn: async () => {
			try {
				const data = await adaptMilkTrendDateToLanguage(
					await milkClient.getGetMilkTimeSeriesAnalytics({
						queries: { interval, start_date, end_date, producer_uuid },
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
