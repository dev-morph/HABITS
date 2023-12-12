<template>
    <div class="theme__layer">
        <canvas id="canvas" ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import ThemeManager from '@/theme-scripts/ThemeManager'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const canvasRef = ref()
const { info } = storeToRefs(userStore)

const themeManager = ref()

watch(
    () => info.value,
    () => {
        themeManager.value.stopAnimation()
        themeManager.value.setTheme(info.value.theme?.title)
    }
)

onMounted(() => {
    themeManager.value = new ThemeManager(canvasRef.value, info.value.theme?.title as string)
})
</script>

<style lang="scss" scoped>
.theme__layer {
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
