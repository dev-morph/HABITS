<template>
    <!-- <svg class="my-svg-component"> -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-plus"
    >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <!-- </svg> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'plusSvg',
    props: {
        size: { type: String, required: true }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="scss"></style>
