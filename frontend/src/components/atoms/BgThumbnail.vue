<template>
	<div class="img__thumbnail">
		<img :src="loadImage(url)" alt="" />
		<!-- <img src="@/assets/imgs/snow-head-mountain.jpg" alt="" /> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'BgThumbnail',
	// components: {},
	props: {
		url: {
			type: String,
			required: true,
		},
	},

	setup() {
		function loadImage(url: string) {
			return require(`/public/imgs/${url}`);
		}
		return {
			loadImage,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.img__thumbnail {
	cursor: pointer;
	&:hover {
		filter: contrast(50%);
	}

	img {
		border-radius: 0.25rem;
		height: 100%;
	}
}
</style>
