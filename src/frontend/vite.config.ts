import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return ({
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    server: {
      proxy: {
        "/api": {
          target: "http://email-creator-app-1:8080", // Local only
          secure: false,
          changeOrigin: true,
        },
        "/auth": {
          target: "http://email-creator-app-1:8080", // Local only
          secure: false,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
    },
  })
})
