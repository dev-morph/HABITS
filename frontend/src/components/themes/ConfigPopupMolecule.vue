<template>
	<popup :position="'bottom-right'" :target="'Config'">
		<configAutom></configAutom>
	</popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Popup from '../common/Popup.vue';
import ConfigAutom from './ConfigAutom.vue';

export default defineComponent({
	name: 'ConfigPopupMolecule',
	components: {
		Popup,
		ConfigAutom,
	},
	// props: {},
	setup() {
		return {};
	},
	methods: {},
});
</script>

<style lang="scss" scoped></style>
