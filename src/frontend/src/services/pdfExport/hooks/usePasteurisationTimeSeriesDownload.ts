import { toast } from "react-toastify";
import { tTyped } from "../../../configs/i18n";
import pdfClient from "../services";
import type { PasteurisationTimeSeriesExportParams } from "../types";

export const useExportPasteurisationTimeSeries = async (
	params: PasteurisationTimeSeriesExportParams
) => {
	try {
		const blob = await pdfClient.generatePasteurisationTimeSeriesPdf(params);

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "pasteurisation_time_series.pdf";
		a.click();
		window.URL.revokeObjectURL(url);
	} catch (err: any) {
		if (err.response) {
			const tNetworkError = tTyped("errors");
			const status = err.response.status || 500;

			const text = await err.response.data.text();
			const parsedText = await JSON.parse(text);

			const message = status !== 500 ? parsedText.detail : tNetworkError("error_codes.500");

			toast.error(message);
			return;
		}
		toast.error("Something went wrong...");
	}
};
