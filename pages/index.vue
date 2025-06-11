<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useProductsStore } from "~/stores/products";
import { useToast } from "vue-toastification";
import { ContentLoader } from "vue-content-loader";

const auth = useAuthStore();
const store = useProductsStore();
const toast = useToast();

const isLoading = ref(true);

onMounted(async () => {
	try {
		// Искусственная задержка для отладки skeleton
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await store.fetchProducts();
		await store.fetchCategories();
	} catch (e) {
		toast.error("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
	} finally {
		isLoading.value = false;
	}
});

function handleProductClick(productId: number) {
	if (!auth.token) {
		navigateTo(`/login?redirect=/products/${productId}`);
	} else {
		navigateTo(`/products/${productId}`);
	}
}

function handleLogout() {
	auth.setToken(null);
	toast.success("Вы успешно вышли из системы");
	navigateTo("/");
}
</script>

<template>
	<div class="p-4 space-y-4 bg-background-alt">
		<div class="flex justify-between items-center">
			<div class="flex flex-nowrap gap-2 items-center">
				<input v-model="store.search" placeholder="Поиск" class="input w-64" />
				<select v-model="store.categoryFilter" class="input w-48">
					<option value="">Все категории</option>
					<option v-for="c in store.categories" :key="c" :value="c">
						{{ c }}
					</option>
				</select>
			</div>
			<button
				v-if="!auth.token"
				@click="navigateTo('/login')"
				class="btn flex items-center gap-2"
			>
				<svg
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
					/>
				</svg>
				Войти
			</button>
			<button
				v-else
				@click="handleLogout"
				class="btn bg-gray-500 hover:bg-gray-600 flex items-center gap-2"
			>
				<svg
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
				Выйти
			</button>
		</div>

		<div
			v-if="isLoading"
			class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			<div v-for="i in 8" :key="i" class="card p-4">
				<content-loader :width="300" :height="160" class="mb-2">
					<rect x="0" y="0" rx="4" ry="4" width="300" height="160" />
				</content-loader>

				<content-loader :width="250" :height="40">
					<rect x="0" y="0" rx="4" ry="4" width="250" height="20" />
					<rect x="0" y="30" rx="4" ry="4" width="200" height="20" />
				</content-loader>

				<content-loader :width="80" :height="20" class="mt-2">
					<rect x="0" y="0" rx="4" ry="4" width="80" height="20" />
				</content-loader>
			</div>
		</div>

		<div v-else>
			<div
				v-if="store.filtered.length > 0"
				class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				<div
					v-for="p in store.filtered"
					:key="p.id"
					@click="handleProductClick(p.id)"
					class="card p-4 flex flex-col cursor-pointer"
				>
					<img
						:src="p.image"
						:alt="p.title"
						class="h-40 w-full object-contain mb-2"
						loading="lazy"
					/>
					<h3 class="font-medium mb-1 line-clamp-2">{{ p.title }}</h3>
					<span class="mt-auto font-bold text-primary">${{ p.price }}</span>
				</div>
			</div>
			<div v-else class="text-center py-8">
				<p class="text-gray-500">Товары не найдены</p>
			</div>
		</div>
	</div>
</template>
