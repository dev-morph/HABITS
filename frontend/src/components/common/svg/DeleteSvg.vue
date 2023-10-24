<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		stroke-width="3"
		stroke="#b7b7b7"
		class="w-6 h-6"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'DeleteSvg',
	components: {},
	props: {
		size: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {};
	},
	methods: {},
});
</script>

<style lang="scss" scoped></style>
