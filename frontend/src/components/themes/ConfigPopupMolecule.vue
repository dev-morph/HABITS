<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePopupStore } from '@/store/popup';
import Popup from '../common/Popup.vue';
export default defineComponent({
	name: 'ConfigPopupMolecule',
	components: {},
	props: {},
	setup() {
		const popupStore = usePopupStore();
		return {};
	},
	methods: {},
});
</script>

<style lang="scss" scoped></style>
