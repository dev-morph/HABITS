import { defineStore } from 'pinia';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		name: '',
		info: {
			name: '',
			email: '',
		},
	}),
	getters: {
		getUserInfo: state => state.info,
	},
	actions: {
		setUserInfo() {
			const stringifiedUser = localStorage.getItem('user');
			if (stringifiedUser) {
				this.$state.info = JSON.parse(stringifiedUser);
			}
		},
	},
});
