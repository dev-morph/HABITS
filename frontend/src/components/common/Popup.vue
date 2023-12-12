<template>
    <transition name="popup">
        <div
            class="popup__layer"
            v-if="popupStore.getOpenedPopup === target"
            @click="popupStore.closePopup"
        >
            <div class="popup" :class="computedPosition" @click.stop>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
interface PopupProps {
    position?: PopupPositionType
    target: OpenableType
}

import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { usePopupStore } from '@/store/popup'
import type { PopupPositionType, OpenableType } from '@/types/types'

const popupStore = usePopupStore()
const { position, target } = defineProps<PopupProps>()

const computedPosition: ComputedRef<PopupPositionType> = computed(() => {
    if (position) return position
    else return 'top-right'
})
</script>

<style lang="scss" scoped>
.popup__layer {
    --background--hsl: 0% 0% 6%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;

    .popup {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 0.35rem;

        &.top-right {
            top: 5rem;
            right: 0.75rem;

            &:before {
                content: '';
                position: absolute;
                display: block;
                border-top: 0;
                border: 10px solid transparent;
                border-bottom: 10px solid rgba(0, 0, 0, 0.8);
                top: -20px;
                right: 1rem;
            }
        }

        &.bottom-right {
            bottom: 1rem;
            left: 0.75rem;
        }
    }
}
</style>
