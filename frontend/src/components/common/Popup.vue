<template>
	<transition name="popup">
		<div class="popup__layer" v-if="popupStore.isPopupOpen" @click="popupStore.closePopup">
			<div class="popup" @click.stop>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePopupStore } from '@/store/popup';

export default defineComponent({
	name: 'Popup',
	components: {},
	setup() {
		const popupStore = usePopupStore();

		return {
			//variables
			popupStore,
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
		top: 5rem;
		right: 0.75rem;
		background-color: hsl(0 0 6% / 0.925);
		border-radius: 0.35rem;
		// width: 100%;
		// height: 50px;

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
}
</style>
