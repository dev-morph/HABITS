<template>
	<div id="app">
		<navbar />
		<router-view />
		<NavPopupMolecule />
		<ConfigPopupMolecule />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import NavPopupMolecule from './components/nav/NavPopupMolecule.vue';
import ConfigPopupMolecule from './components/themes/ConfigPopupMolecule.vue';

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		// Popup,
		NavPopupMolecule,
		ConfigPopupMolecule,
	},

	setup() {
		return {};
	},
});
</script>

<style lang="scss">
@import url('./styles/variables.scss');
#app {
	background-image: var(--bg-image-url);
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	color: var(--text--primary);
}
</style>
