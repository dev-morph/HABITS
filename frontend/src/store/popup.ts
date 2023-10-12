import { defineStore } from 'pinia';

export const usePopupStore = defineStore({
	id: 'popup',
	state: () => ({
		isPopupOpen: false,
	}),
	getters: {
		getPopupState: state => state.isPopupOpen,
	},
	actions: {
		closePopup() {
			this.isPopupOpen = false;
		},
		openPopup() {
			this.isPopupOpen = true;
		},
	},
});
