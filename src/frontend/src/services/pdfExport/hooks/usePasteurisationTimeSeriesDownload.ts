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
	} catch (err) {
		console.error("Failed to download PDF", err);
	}
};
