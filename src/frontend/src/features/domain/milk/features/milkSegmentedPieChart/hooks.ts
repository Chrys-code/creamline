import type { IntervalTypes } from "../../../../../shared/types";

import { useQuery } from "@tanstack/react-query";
import { milkClient } from "../../services/client";
import { tTyped } from "../../../../../configs/i18n";
import { toast } from "react-toastify";

export function useMilkSegmentedByProducers(interval: IntervalTypes = "day") {
	return useQuery({
		queryKey: ["milkSegmentedByProducer", interval],
		queryFn: async () => {
			try {
				const data = await milkClient.getMilkAnalyticsSegmentedByProducers({
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
