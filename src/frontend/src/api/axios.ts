import { createApiClient } from "../lib/schemas/schemas";
import { getCookie } from "../lib/helpers/cookie";

export const api = createApiClient("/", {
	axiosConfig: {
		withCredentials: true,
	},
});

api.axios.interceptors.request.use((config: any) => {
	const csrfToken = getCookie("csrftoken");
	if (csrfToken && ["post", "patch", "delete"].includes(config.method || "")) {
		config.headers["X-CSRFToken"] = csrfToken;
	}
	return config;
});