<template>
	<transition name="popup">
		<div class="popup__layer" v-if="popupStore.getOpenedPopup === target" @click="popupStore.closePopup">
			<div class="popup" :class="computedPosition" @click.stop>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ComputedRef } from 'vue';
import { usePopupStore } from '@/store/popup';
import { PopupPositionType, OpenableType } from '@/types/types';

export default defineComponent({
	name: 'Popup',
	components: {},
	props: {
		position: {
			type: String as PropType<PopupPositionType>,
		},
		target: {
			type: String as PropType<OpenableType>,
			requireed: true,
		},
	},
	setup(props) {
		const popupStore = usePopupStore();

		const computedPosition: ComputedRef<PopupPositionType> = computed(() => {
			console.log('props.position', props.position);
			if (props.position) return props.position;
			else return 'top-right';
		});

		return {
			//variables
			popupStore,
			computedPosition,
			//functions,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.popup__layer {
	position: absolute;
	top: 0;
	left: 0;
	background-color: transparent;
	width: 100%;
	height: 100%;

	.popup {
		position: absolute;
		background-color: hsl(0 0 6% / 0.925);
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
				border-bottom: 10px solid hsl(0 0 6% / 0.925);
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
