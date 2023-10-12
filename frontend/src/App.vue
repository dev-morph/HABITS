<template>
	<div id="app">
		<Navbar />
		<router-view />
		<Popup />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Popup from './components/common/Popup.vue';

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		Popup,
	},

	setup() {
		return {};
	},
});
</script>

<style lang="scss">
#app {
	background-image: url('@/assets/imgs/snow-head-mountain.jpg');
	background-size: cover;
	color: white;
}
</style>
