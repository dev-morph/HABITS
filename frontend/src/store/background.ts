import { defineStore } from 'pinia';

export const useBackgroundStore = defineStore({
	id: 'background',
	state: () => ({
		backgroundPath: '@/assets/imgs/snow-head-mountain.jpg',
	}),
	getters: {
		getBackgroundPath: state => state.backgroundPath,
	},
	actions: {
		setBackgroundImage(path: string) {
			this.backgroundPath = path;
		},
	},
});
