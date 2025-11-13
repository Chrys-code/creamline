import { createApiClient } from "./endpoints";
import { getCookie } from "../../../../shared/helpers/getCookie/getCookie";

export const productDefinitionClient = createApiClient("/", {
	axiosConfig: {
		withCredentials: true,
	},
});

productDefinitionClient.axios.interceptors.request.use((config: any) => {
	const csrfToken = getCookie({ name: "csrftoken", cookies: document.cookie });
	if (csrfToken && ["post", "patch", "put", "delete"].includes(config.method || "")) {
		config.headers["X-CSRFToken"] = csrfToken;
	}
	return config;
});
