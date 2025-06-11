import { defineStore } from "pinia";

interface AuthState {
	token: string | null;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthState => ({
		token: null,
	}),

	actions: {
		setToken(token: string | null) {
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
