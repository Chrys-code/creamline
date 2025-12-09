import type { AxiosInstance } from "axios";
import axios from "axios";
import { getCookie } from "../../../shared/helpers/getCookie/getCookie";

class PdfClient {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			responseType: "blob",
			withCredentials: true,
		});

		this.axiosInstance.interceptors.request.use((config) => {
			const csrfToken = getCookie({ name: "csrftoken", cookies: document.cookie });
			if (
				csrfToken &&
				["post", "patch", "put", "delete"].includes(
					config.method?.toLocaleLowerCase() || ""
				)
			) {
				config.headers["X-CSRFToken"] = csrfToken;
			}
			return config;
		});
	}

	async generateMilkTimeSeriesPdf(
		params: Record<string, any>,
		signal?: AbortSignal
	): Promise<Blob> {
		const response = await this.axiosInstance.post(
			"/milk/generate-milk-time-series-pdf",
			params,

			{ withCredentials: true, signal }
		);
		return response.data;
	}

	async generatePasteurisationTimeSeriesPdf(
		params: Record<string, any>,
		signal?: AbortSignal
	): Promise<Blob> {
		const response = await this.axiosInstance.post(
			"/pasteurisation/generate-pasteurisation-time-series-pdf",
			params,

			{ withCredentials: true, signal }
		);
		return response.data;
	}
}

const pdfClient = new PdfClient("/api/v1/pdf");
export default pdfClient;
