import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return ({
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./setupTests.ts",
		}
  })
})
