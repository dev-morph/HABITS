<template>
	<header>
		<nav>
			<router-link to="/" class="icon">
				<img src="habit_nobackground.png" alt="habits_logo" />
			</router-link>
			<div class="navigation">
				<span>Login</span>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'HomeView',
	setup() {
		return {};
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
}
</style>
