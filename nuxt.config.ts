// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	css: ["~/assets/styles.scss"],
	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
	runtimeConfig: {
		public: {
			apiBase: "https://fakestoreapi.com",
		},
	},
	app: {
		baseURL: "/testTask-catalogue/",
	},
	routeRules: {
		"/api/**": {
			proxy: "https://fakestoreapi.com/**",
		},
	},
	build: {
		transpile: ["vue-toastification"],
	},
});
