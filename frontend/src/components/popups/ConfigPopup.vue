<template>
    <Popup :position="'bottom-right'" :target="'Config'">
        <Config></Config>
    </Popup>
</template>

<script setup lang="ts">
import Popup from '@/components/common/Popup.vue'
import Config from '@/components/configs/Config.vue'
</script>

<style lang="scss" scoped></style>
