import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
	const auth = useAuthStore();
	if (!auth.token) {
		return navigateTo({
			path: "/login",
			query: { redirect: to.fullPath },
		});
	}
});
