import path from "path";
import type { UserConfig } from "vite";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	const baseConfig: UserConfig = {
		build: {
			outDir: "dist",
			target: "esnext",
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};

	if (env.ENV === "development") {
		baseConfig["server"] = {
			proxy: {
				"/api": {
					target: "http://creamline-dev-backend-1:8000", // Local only
					secure: false,
					changeOrigin: true,
				},
			},
		};
	}

	return {
		...baseConfig,
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./setupTests.ts",
		},
	};
});
