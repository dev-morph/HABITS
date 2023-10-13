import { defineStore } from 'pinia';
import { getUserDetail } from '@/api/userApi';
import { UserType } from '@/types/types';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		info: {
			username: '',
			email: '',
		},
	}),
	getters: {
		userInfo: state => state.info,
	},
	actions: {
		async getUserInfo() {
			const { data } = await getUserDetail();
			localStorage.setItem('user', JSON.stringify(data));
			this.$state.info = data;
		},

		storeUserInfo(user: UserType) {
			localStorage.setItem('user', JSON.stringify(user));
			this.$state.info = user;
		},

		setUserInfo() {
			const stringifiedUser = localStorage.getItem('user');
			if (stringifiedUser) {
				this.$state.info = JSON.parse(stringifiedUser);
			}
		},
		setUserName(name: string) {
			this.$state.info.username = name;
		},
		setUserEmail(email: string) {
			this.$state.info.email = email;
		},
	},
});
