<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { ContentLoader } from "vue-content-loader";

const auth = useAuthStore();
const route = useRoute();
const toast = useToast();

const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function submit() {
	error.value = "";
	loading.value = true;

	try {
		const { data, error: fetchError } = await useFetch(
			"https://fakestoreapi.com/auth/login",
			{
				method: "POST",
				body: {
					username: username.value,
					password: password.value,
				},
			}
		);

		if (fetchError.value) {
			throw fetchError.value;
		}

		if (data.value) {
			auth.setToken(data.value.token);
			const redirect =
				typeof route.query.redirect === "string" ? route.query.redirect : "/";
			navigateTo(redirect);
			toast.success("Вы успешно вошли в систему");
		}
	} catch (e) {
		toast.error("Неверное имя пользователя или пароль");
	} finally {
		loading.value = false;
	}
}

if (auth.token) {
	const redirect =
		typeof route.query.redirect === "string" ? route.query.redirect : "/";
	navigateTo(redirect);
}
</script>

<template>
	<div
		class="flex min-h-screen items-center justify-center p-4 bg-background-alt"
	>
		<form @submit.prevent="submit" class="w-full max-w-sm space-y-4 card p-6">
			<h1 class="text-2xl font-bold text-center mb-6">Авторизация</h1>

			<div>
				<label class="block mb-1 text-text-light">Имя пользователя</label>
				<input v-model="username" class="input w-full" :disabled="loading" />
			</div>
			<div>
				<label class="block mb-1 text-text-light">Пароль</label>
				<input
					type="password"
					v-model="password"
					class="input w-full"
					:disabled="loading"
				/>
			</div>
			<button type="submit" class="btn w-full" :disabled="loading">
				<span v-if="loading" class="flex items-center justify-center">
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Загрузка...
				</span>
				<span v-else>Войти</span>
			</button>
		</form>
	</div>
</template>
