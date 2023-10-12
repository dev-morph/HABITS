<template>
	<transition name="popup">
		<div class="popup__layer" v-if="popupStore.isPopupOpen" @click="popupStore.closePopup">
			<div class="popup" @click.stop>
				<ul class="popup__list__wrapper">
					<li v-for="(item, index) in mypageList" :key="index" class="list__item">{{ item }}</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePopupStore } from '../../store/popup';

export default defineComponent({
	name: 'Popup',
	components: {},
	setup() {
		const popupStore = usePopupStore();
		const mypageList = ref(['마이 페이지', '캘린더 페이지', '루틴 설정', '테마 설정']);
		return {
			//variables
			popupStore,
			mypageList,
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
		width: 150px;
		height: 180px;
		position: absolute;
		top: 5rem;
		right: 0.75rem;
		background-color: hsl(0 0 6% / 0.925);
		border-radius: 0.35rem;

		&:before {
			content: '';
			position: absolute;
			display: block;
			border-top: 0;
			border: 10px solid transparent;
			border-bottom: 10px solid hsl(0 0 6% / 0.925);
			// width: 100px;
			// height: 100px;
			top: -20px;
			right: 1rem;
		}

		.popup__list__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			.list__item {
				width: 100%;
				cursor: pointer;
				text-align: center;

				&:hover {
					text-shadow: 0 0 12px rgb(99, 99, 99);
					transform: scale(1.05);
				}
			}
		}
	}
}
</style>
