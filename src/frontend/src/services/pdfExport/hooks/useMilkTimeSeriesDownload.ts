import type { MilkTimeSeriesExportParams } from "../types";
import pdfClient from "../services";
import { toast } from "react-toastify";
import { tTyped } from "@/configs/i18n";

export const useExportMilkTimeSeries = async (params: MilkTimeSeriesExportParams) => {
	try {
		const blob = await pdfClient.generateMilkTimeSeriesPdf(params);

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "milk_time_series.pdf";
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
