<template>
	<div class="config__wrapper">
		<config-popup-molecule />
		<div class="config__btn__wrapper" @click="popupStore.openPopup('Config')">
			<gear-svg :size="'2rem'" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GearSvg from '@/components/common/svg/GearSvg.vue';
import ConfigPopupMolecule from '../themes/ConfigPopupMolecule.vue';
import { usePopupStore } from '@/store/popup';

export default defineComponent({
	name: 'ConfigMolecule',
	components: {
		GearSvg,
		ConfigPopupMolecule,
	},
	// props: {},
	setup() {
		const popupStore = usePopupStore();
		return {
			//variables
			popupStore,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.config__wrapper {
	// padding-bottom: 1rem;
	padding-left: 1rem;
	display: flex;
	.config__btn__wrapper {
		cursor: pointer;
		&:hover {
			transform: scale(1.05);
		}
	}
}
</style>
