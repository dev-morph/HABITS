<template>
	<header>
		<nav>
			<router-link :to="loggedIn ? '/home' : '/'" class="icon">
				<img src="habit_nobackground.png" alt="habits_logo" />
			</router-link>
			<div class="navigation">
				<div class="login__btn" v-if="!loggedIn">Login</div>
				<div class="login__btn" v-else @click="popupStore.openPopup">MyPage</div>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { usePopupStore } from '@/store/popup';

export default defineComponent({
	name: 'HomeView',
	setup() {
		const popupStore = usePopupStore();
		const loggedIn = ref();
		onMounted(() => {
			loggedIn.value = localStorage.getItem('user');
		});
		return {
			//variables,
			popupStore,
			loggedIn,
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
