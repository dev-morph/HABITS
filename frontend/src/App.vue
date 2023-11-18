<template>
	<div id="app">
		<ThemeLayer />
		<div id="content__layer">
			<navbar />
			<router-view />
			<NavPopupMolecule />
			<ConfigPopupMolecule />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import Navbar from './components/Navbar.vue';
import NavPopupMolecule from './components/nav/NavPopupMolecule.vue';
import ConfigPopupMolecule from './components/themes/ConfigPopupMolecule.vue';
import ThemeLayer from './components/common/ThemeLayer.vue';
import { useUserStore } from './store/user';

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
		// Popup,
		NavPopupMolecule,
		ConfigPopupMolecule,
		ThemeLayer,
	},

	setup() {
		const userStore = useUserStore();

		onBeforeMount(async () => {
			await userStore.getUserInfo();
			userStore.setBg();
		});

		return {};
	},
});
</script>

<style lang="scss">
@import url('./styles/variables.scss');
#app {
	width: 100%;
	height: 100%;
	background-image: var(--bg-image-url);
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	text-shadow: var(--text-shadow);
	color: var(--text--primary);
	#content__layer {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
}
</style>
