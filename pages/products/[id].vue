<script setup lang="ts">
import { useProductsStore } from "~/stores/products";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { ContentLoader } from "vue-content-loader";

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

definePageMeta({
	middleware: ["auth"],
});

const route = useRoute();
const toast = useToast();

const loading = ref(true);
onMounted(async () => {
	try {
		// Искусственная задержка для отладки skeleton
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const { data, error: fetchError } = await useFetch<Product>(
			`https://fakestoreapi.com/products/${route.params.id}`,
			{
				key: `product-${route.params.id}`,
				transform: (response) => response,
			}
		);
		if (fetchError.value) {
			toast.error("Не удалось загрузить товар. Пожалуйста, попробуйте позже.");
		}
		product.value = data.value as Product;
	} finally {
		loading.value = false;
	}
});

const product = ref<Product>({} as Product);

const quantity = ref(1);
const isAdded = ref(false);

function incrementQuantity() {
	quantity.value++;
}

function decrementQuantity() {
	if (quantity.value > 1) {
		quantity.value--;
	}
}

function addToCart() {
	isAdded.value = true;
	// ...
}

function getRatingStars(rating: number) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return {
		fullStars,
		hasHalfStar,
		emptyStars,
	};
}
</script>

<template>
	<div class="p-4 max-w-4xl mx-auto bg-background-alt">
		<button @click="navigateTo('/')" class="mb-6 flex items-center text-link">
			<svg
				class="w-5 h-5 mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Вернуться в каталог
		</button>

		<div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<content-loader
				:width="400"
				:height="400"
				class="rounded w-full max-w-[400px]"
			>
				<rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
			</content-loader>
			<div class="space-y-4">
				<content-loader :width="200" :height="24">
					<rect x="0" y="0" rx="4" ry="4" width="200" height="24" />
				</content-loader>
				<content-loader :width="150" :height="20">
					<rect x="0" y="0" rx="4" ry="4" width="150" height="20" />
				</content-loader>
				<content-loader :width="300" :height="60">
					<rect x="0" y="0" rx="4" ry="4" width="300" height="20" />
					<rect x="0" y="30" rx="4" ry="4" width="250" height="20" />
				</content-loader>
				<content-loader :width="150" :height="40">
					<rect x="0" y="0" rx="4" ry="4" width="150" height="40" />
				</content-loader>
			</div>
		</div>

		<div v-else-if="product" class="space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="card flex items-center justify-center p-4">
					<img
						:src="product.image"
						:alt="product.title"
						class="max-h-96 object-contain"
						loading="lazy"
					/>
				</div>

				<div class="space-y-4">
					<h1 class="text-3xl font-bold">{{ product.title }}</h1>

					<!-- Рейтинг -->
					<div class="flex items-center space-x-2">
						<div class="flex">
							<template
								v-for="i in getRatingStars(product.rating.rate).fullStars"
								:key="i"
							>
								<svg
									class="w-5 h-5 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							</template>
							<template v-if="getRatingStars(product.rating.rate).hasHalfStar">
								<svg
									class="w-5 h-5 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<defs>
										<linearGradient id="halfStar">
											<stop offset="50%" stop-color="currentColor" />
											<stop offset="50%" stop-color="#D1D5DB" />
										</linearGradient>
									</defs>
									<path
										fill="url(#halfStar)"
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							</template>
							<template
								v-for="i in getRatingStars(product.rating.rate).emptyStars"
								:key="i"
							>
								<svg
									class="w-5 h-5 text-gray-300"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							</template>
						</div>
						<span class="text-sm text-gray-600">
							{{ product.rating.rate }} ({{ product.rating.count }} отзывов)
						</span>
					</div>

					<div class="text-2xl font-bold text-primary mb-4">
						${{ product.price }}
					</div>

					<div class="flex items-center gap-4 mb-6">
						<div class="flex items-center border rounded-lg">
							<button
								@click="decrementQuantity"
								class="px-3 py-2 text-gray-600 hover:bg-gray-100"
								:disabled="quantity <= 1 || isAdded"
							>
								-
							</button>
							<input
								type="number"
								v-model="quantity"
								class="w-16 text-center border-x py-2"
								min="1"
								:disabled="isAdded"
							/>
							<button
								@click="incrementQuantity"
								class="px-3 py-2 text-gray-600 hover:bg-gray-100"
								:disabled="isAdded"
							>
								+
							</button>
						</div>
						<button
							@click="addToCart"
							class="flex-1 py-2 px-4 rounded-lg transition-colors"
							:class="{
								'bg-blue-200 hover:bg-blue-300 text-blue-800': isAdded,
								'bg-blue-500 hover:bg-blue-600 text-white': !isAdded,
							}"
						>
							{{ isAdded ? "Добавлено в корзину" : "Добавить в корзину" }}
						</button>
					</div>

					<div class="space-y-2">
						<h2 class="text-xl font-semibold">Описание</h2>
						<p class="text-text-light">{{ product.description }}</p>
					</div>

					<div class="space-y-2">
						<h2 class="text-xl font-semibold">Категория</h2>
						<p class="text-text-light capitalize">{{ product.category }}</p>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="text-center py-8">
			<p class="text-red-500">Товар не найден</p>
		</div>
	</div>
</template>
