<template>
	<div class="img__thumbnail">
		<img :src="loadImage(url)" alt="" />
	</div>
</template>

<script setup lang="ts">
interface BgThumbnailProps {
	url: string;
}

import { toRefs } from 'vue';

const props = defineProps<BgThumbnailProps>();
const { url } = toRefs(props);

function loadImage(url: string) {
	return require(`/public/imgs/${url}`);
}
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
