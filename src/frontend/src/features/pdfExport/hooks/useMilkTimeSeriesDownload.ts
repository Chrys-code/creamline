import pdfClient from "../services";
import type { TimeSeriesExportParams } from "../types";

export const useExportMilkTimeSeries = async (params: TimeSeriesExportParams) => {
	try {
		const blob = await pdfClient.generateMilkTimeSeriesPdf(params);

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "milk_time_series.pdf";
		a.click();
		window.URL.revokeObjectURL(url);
	} catch (err) {
		console.error("Failed to download PDF", err);
	}
};
