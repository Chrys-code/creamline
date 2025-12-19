import i18n from "@/configs/i18n";

import { createApiClient } from "./endpoints";

import { getCookie } from "@/shared/helpers/getCookie/getCookie";

export const authClient = createApiClient("/", {
	axiosConfig: {
		withCredentials: true,
	},
});

authClient.axios.interceptors.request.use((config: any) => {
	const csrfToken = getCookie({ name: "csrftoken", cookies: document.cookie });
	if (csrfToken && ["post", "patch", "put", "delete"].includes(config.method || "")) {
		config.headers["X-CSRFToken"] = csrfToken;
	}

	const language = i18n.language;
	config.headers["X-Language"] = language;

	return config;
});
