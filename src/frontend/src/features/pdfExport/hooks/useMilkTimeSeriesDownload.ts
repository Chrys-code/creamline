import pdfClient from "../services";
import type { MilkTimeSeriesExportParams } from "../types";

export const useExportMilkTimeSeries = async (params: MilkTimeSeriesExportParams) => {
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
