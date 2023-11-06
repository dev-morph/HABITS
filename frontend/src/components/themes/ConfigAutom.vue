<template>
	<div class="grid__wrapper">
		<div class="config__menu__wrapper">
			<div class="config__menu" v-for="(item, index) in configMenuList" :key="index" @click="handleNav(index)">{{ item }}</div>
		</div>
		<div class="config__detail__wrapper">
			<div class="config__detail__container">
				<div class="thumbnail__list">
					<bg-thumbnail v-for="(image, idx) in bgImages" :key="idx" :url="image" @click="bgHandler(image)" />
				</div>
			</div>
			<img id="test" src="" alt="" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BgThumbnail from '@/components/atoms/BgThumbnail.vue';

export default defineComponent({
	name: 'ConfigAutom',
	components: {
		BgThumbnail,
	},
	// props: {},
	setup() {
		const configMenuList = ref(['배경설정', '테마설정']);
		const bgImages = ref([
			'big_starry_night_bg.png',
			'clouds_bg.png',
			'coral_bg.png',
			'coral_big_bg.png',
			'sea_ships_bg.png',
			'rainy_town_bg.png',
			'rain_house_bg.png',
			'rain_leaf_tree_bg.png',
			'rain_moon_bg.png',
			'rain_moon_flowers_bg.png',
			'rain_no_leaf_tree_bg.png',
			'rain_woman_bg.png',
		]);
		const curNavPosition = ref(0);

		function handleNav(index: number) {
			curNavPosition.value = index;
		}

		function bgHandler(imageName: string) {
			const bgPath = `/imgs/${imageName}`;
			const bgUrl = `url(${bgPath})`;
			document.documentElement.style.setProperty('--bg-image-url', bgUrl);
		}
		return {
			//variables
			configMenuList,
			curNavPosition,
			bgImages,
			//functions
			handleNav,
			bgHandler,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.grid__wrapper {
	--config-nav-width: 200px;
	--config-main-width: 520px;
	--config-height: 520px;

	display: flex;

	overflow: auto;
	// overflow-x: hidden;
	// overflow-y: auto;
	text-align: left;

	width: 720px;
	max-width: calc(100vw - 10px * 2);
	.config__menu__wrapper {
		width: var(--config-nav-width);
		height: var(--config-height);
		border-right: 1px solid var(--border--color);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 1rem;
		gap: 0.5rem;
		flex: 0 0 var(--config-nav-width);

		.config__menu {
			cursor: pointer;
			color: var(--text--inactive);
			font-weight: var(--ff-nav-weight);
			&:hover {
				color: var(--text--primary);
				transform: scale(1.05);
			}
		}
	}

	.config__detail__wrapper {
		height: 100%;
		width: var(--config-main-width);
		display: flex;
		flex-direction: column;

		.thumbnail__list {
			display: grid;
			gap: 1rem;
			grid-template-columns: repeat(4, 1fr);
			padding: 1rem;
		}
	}
}
</style>
