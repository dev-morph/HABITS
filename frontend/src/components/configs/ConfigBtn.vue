<template>
    <div class="config__wrapper">
        <ConfigPopup />
        <div class="config__btn__wrapper" @click="popupStore.openPopup('Config')">
            <gear-svg :size="'2rem'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import GearSvg from '@/components/common/svg/GearSvg.vue'
import { usePopupStore } from '@/store/popup'
import ConfigPopup from '@/components/popups/ConfigPopup.vue'

const popupStore = usePopupStore()
</script>

<style lang="scss" scoped>
.config__wrapper {
    // padding-bottom: 1rem;
    padding-left: 1rem;
    display: flex;
    .config__btn__wrapper {
        cursor: pointer;
        &:hover {
            transform: scale(1.05);
        }
    }
}
</style>
