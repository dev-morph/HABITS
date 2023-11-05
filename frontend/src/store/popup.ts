import { defineStore } from 'pinia';
import { PopupStateType, OpenableType } from '@/types/types';

export const usePopupStore = defineStore({
	id: 'popup',
	state: (): PopupStateType => ({
		openedPopup: null,
	}),
	getters: {
		getOpenedPopup: state => state.openedPopup,
	},
	actions: {
		closePopup() {
			this.openedPopup = null;
		},
		openPopup(target: OpenableType) {
			this.openedPopup = target;
		},
	},
});
