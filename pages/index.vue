<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";

// SEO
useHead({
	title: "",
	meta: [
		{
			name: "description",
			content: "",
		},
		{
			property: "og:title",
			content: "",
		},
		{ property: "og:description", content: "..." },
		{ property: "og:image", content: "/images/og-cover.png" },
		{ name: "twitter:card", content: "summary_large_image" },
	],
});

const menuOpen = ref(false);
const isMobile = ref(false);

const videoRef = ref<HTMLVideoElement | null>(null);
let player: any = null;

function updateViewport() {
	isMobile.value = window.innerWidth <= 650;
}
onMounted(async () => {
	updateViewport();
	window.addEventListener("resize", updateViewport);

	if (process.client && videoRef.value) {
		player = videojs(videoRef.value, {
			controls: true,
			autoplay: false,
			preload: "auto",
			fluid: true,
			controlBar: {
				children: [
					"playToggle",
					"volumePanel",
					"progressControl",
					"currentTimeDisplay",
					"timeDivider",
					"durationDisplay",
					"playbackRateMenuButton",
					"fullscreenToggle",
				],
			},
		});
	}
});
onUnmounted(() => {
	window.removeEventListener("resize", updateViewport);
	if (player) {
		player.dispose();
	}
});

function goToLogin() {
	const el = document.getElementById("form");
	if (el) {
		el.scrollIntoView({ behavior: "smooth" });
	}
}
function handleCtaClick() {
	document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
}

const vScrollAnimation = {
	mounted: (el: HTMLElement) => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						el.classList.add("animate-in");
						observer.unobserve(el);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		observer.observe(el);
	},
};
</script>

<template>
	<div class="container">
		<header class="header desktop-header">
			<div class="header-right"></div>
		</header>

		<!-- Mobile Header (только для ≤ 900px) -->
		<header class="header mobile-header">
			<div class="burger" @click="menuOpen = true">
				<div></div>
				<div></div>
				<div></div>
			</div>

			<!-- Мобильное меню -->
			<div v-if="menuOpen" class="mobile-menu">
				<div class="menu-header">
					<button class="close" @click="menuOpen = false">✕</button>
				</div>
				<nav class="menu-links">
					<a href="#" @click="menuOpen = false"></a>
					<a href="#" @click="menuOpen = false"></a>
					<a href="#" @click="menuOpen = false"></a>
					<a href="#" @click="menuOpen = false"></a>
				</nav>
			</div>
		</header>
		<section class="hero">
			<div class="hero-content"><p>aboba</p></div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles.scss";
</style>
