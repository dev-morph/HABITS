<template>
	<transition name="popup">
		<div class="popup__layer" v-if="popupStore.isPopupOpen" @click="popupStore.closePopup">
			<div class="popup" @click.stop>
				<ul class="popup__list__wrapper">
					<li v-for="(item, index) in mypageList" :key="index" class="list__item" @click="navHandler(item.to)">
						{{ item.title }}
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePopupStore } from '../../store/popup';
import { useUserStore } from '@/store/user';

export default defineComponent({
	name: 'Popup',
	components: {},
	setup() {
		const userStore = useUserStore();
		const popupStore = usePopupStore();
		const router = useRouter();
		const mypageList = ref([
			{ title: '마이 페이지', to: '/mypage' },
			{ title: '캘린더 페이지', to: '/calendar' },
			{ title: '루틴 설정', to: '/routine' },
			{ title: '테마 설정', to: '/theme' },
			{ title: '로그아웃', to: '/logout' },
		]);

		async function navHandler(to: string) {
			if (to === '/logout') {
				await userStore.clearUserInfo();
				to = '/login';
			}
			popupStore.closePopup();
			router.push(to);
		}
		return {
			//variables
			popupStore,
			mypageList,
			//functions,
			navHandler,
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
			padding: 1rem 1.25rem;
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
