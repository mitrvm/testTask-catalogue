import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: "",
	}),

	actions: {
		setToken(token: string) {
			this.token = token;
			const cookie = useCookie("auth_token");
			cookie.value = token;
		},

		init() {
			const cookie = useCookie("auth_token");
			if (cookie.value) {
				this.token = cookie.value;
			}
		},
	},
});
