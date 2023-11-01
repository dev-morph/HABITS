<template>
	<div id="app">
		<navbar />
		<router-view />
		<NavPopupMolecule />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import NavPopupMolecule from './components/nav/NavPopupMolecule.vue';

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		// Popup,
		NavPopupMolecule,
	},

	setup() {
		return {};
	},
});
</script>

<style lang="scss">
@import url('./styles/variables.scss');
#app {
	background-image: url('@/assets/imgs/snow-head-mountain.jpg');
	background-size: cover;
	color: var(--text--primary);
}
</style>
