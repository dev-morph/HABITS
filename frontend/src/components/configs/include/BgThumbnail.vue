<template>
    <div class="img__thumbnail">
        <div class="loading" v-show="loading"></div>
        <img v-show="!loading" :src="loadImage(url)" alt="" @load="loadedImage" />
    </div>
</template>

<script setup lang="ts">
interface BgThumbnailProps {
    url: string
}

import { ref, toRefs } from 'vue'

const props = defineProps<BgThumbnailProps>()
const { url } = toRefs(props)

const loading = ref(true)

function loadedImage() {
    loading.value = false
}

function loadImage(url: string) {
    return new URL(`/src/assets/imgs/${url}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.img__thumbnail {
    cursor: pointer;
    &:hover {
        filter: contrast(50%);
    }

    .loading {
        background-color: rgba(60, 60, 60, 0.8);
        border-radius: 0.25rem;
        height: 70px;
    }

    img {
        border-radius: 0.25rem;
        height: 70px;
    }
}
</style>
