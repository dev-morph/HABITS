<template>
	<div class="theme__layer">
		<canvas id="canvas" ref="canvasRef"></canvas>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ThemeManager from '@/theme-scripts/ThemeManager';

export default defineComponent({
	name: 'ThemeLayer',
	components: {},
	setup() {
		const canvasRef = ref();
		onMounted(() => {
			// const theme = new ThemeManager(canvasRef.value);
		});
		return {
			canvasRef,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.theme__layer {
	// position: absolute;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	canvas {
		width: 100%;
		height: 100%;
	}
}
</style>
