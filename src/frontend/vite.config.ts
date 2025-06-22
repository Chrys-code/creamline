import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const baseConfig: UserConfig = {
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    define: {
      "process.env": {
        "RANDOM": env.VITE_RANDOM
      }
    },
  }

  if (env.ENV == "development") {
    baseConfig["server"] = {
      proxy: {
        "/api": {
          target: "http://email-creator-dev-app-1:8000", // Local only
          secure: false,
          changeOrigin: true,
        },
        "/auth": {
          target: "http://email-creator-dev-app-1:8000", // Local only
          secure: false,
          changeOrigin: true,
        },
      },
    }
  }


  return {
    ...baseConfig, test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
    },
  }
})
