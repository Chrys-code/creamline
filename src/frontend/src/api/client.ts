import { createApiClient } from "./endpoints";
import { getCookie } from "../lib/helpers/getCookie/getCookie";

export const api = createApiClient("/", {
	axiosConfig: {
		withCredentials: true,
	},
});

api.axios.interceptors.request.use((config: any) => {
	const csrfToken = getCookie({ name: "csrftoken", cookies: document.cookie });
	if (csrfToken && ["post", "patch", "put", "delete"].includes(config.method || "")) {
		config.headers["X-CSRFToken"] = csrfToken;
	}
	return config;
});
