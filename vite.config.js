import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the build work on GitHub Pages, Netlify, Vercel or any static host
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react()],
		base: "./",
		server: {
			proxy: {
				"/api": {
					target: "https://api.restcountries.com",
					changeOrigin: true,
					headers: env.REST_COUNTRIES_API_KEY
						? { Authorization: `Bearer ${env.REST_COUNTRIES_API_KEY}` }
						: {},
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
