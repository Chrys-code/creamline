import { createApiClient } from "./endpoints";
import { getCookie } from "../../../../shared/helpers/getCookie/getCookie";

export const profileClient = createApiClient("/", {
	axiosConfig: {
		withCredentials: true,
	},
});

profileClient.axios.interceptors.request.use((config: any) => {
	const csrfToken = getCookie({ name: "csrftoken", cookies: document.cookie });
	if (csrfToken && ["post", "patch", "put", "delete"].includes(config.method || "")) {
		config.headers["X-CSRFToken"] = csrfToken;
	}
	return config;
});
