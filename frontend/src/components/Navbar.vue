<template>
	<header>
		<nav>
			<router-link :to="loggedIn ? '/home' : '/'" class="icon">
				<img src="habit_nobackground.png" alt="habits_logo" />
			</router-link>
			<div class="navigation">
				<div class="login__btn" v-if="!loggedIn" @click="toLogin">Login</div>
				<div class="login__btn" v-else @click="popupStore.openPopup('UserInfo')">MyPage</div>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { usePopupStore } from '@/store/popup';
import router from '@/router';

export default defineComponent({
	name: 'HomeView',
	setup() {
		const popupStore = usePopupStore();
		const loggedIn = ref();

		function toLogin() {
			router.push('/login');
		}

		onMounted(function () {
			window.addEventListener('userInfoStored', ((event: CustomEvent) => {
				if (event.detail.userInfo?.email) {
					loggedIn.value = true;
				} else {
					loggedIn.value = false;
				}
				// eslint-disable-next-line no-undef
			}) as EventListener);
		});
		return {
			//variables,
			popupStore,
			loggedIn,
			//functions
			toLogin,
		};
	},
});
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100px;
	div {
		cursor: pointer;
	}
	img {
		width: 75px;
		height: 75px;
	}
	.login__btn {
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: 600;

		&:hover {
			text-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
		}

		&:active {
			transform: scale(1.05);
		}
	}
}
</style>
