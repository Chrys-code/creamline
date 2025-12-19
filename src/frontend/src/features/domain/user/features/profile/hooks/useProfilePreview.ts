import { tTyped } from "@/configs/i18n";

import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";

import { profileClient } from "../services/client";

export const useProfilePreview = (userId: string) => {
	return useQuery({
		queryKey: ["profilePreview", userId],
		queryFn: async () => {
			try {
				const data = await profileClient.getProfilePreview({ queries: { uuid: userId } });
				// Call presigned url and replace profile_image property value
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
				toast.error("Something went wrong getting profile preview");
			}
		},
		refetchInterval: 30000,
		staleTime: 60000,
	});
};
