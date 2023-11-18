import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { getUserDetail } from '@/api/userApi';
import { logoutUser } from '@/api/authApi';
import { UserInfoType, ThemeType } from '@/types/types';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		info: useStorage('user', {
			username: '',
			email: '',
			theme_id: 1,
			theme: undefined as ThemeType | undefined,
		}),
	}),
	getters: {
		userInfo: state => state.info,
		curTheme: state => state.info.theme,
	},
	actions: {
		async getUserInfo() {
			const { data } = await getUserDetail();
			this.$state.info = data;
			window.dispatchEvent(
				new CustomEvent('userInfoStored', {
					detail: {
						userInfo: data,
					},
				})
			);
		},

		storeUserInfo(user: UserInfoType) {
			this.$state.info = user;
		},

		setBg(theme?: ThemeType) {
			let bgPath = '/imgs/';
			if (theme) {
				bgPath += theme.background_path;
			} else {
				bgPath += this.curTheme?.background_path;
			}
			const bgUrl = `url(${bgPath})`;
			document.documentElement.style.setProperty('--bg-image-url', bgUrl);
		},

		async clearUserInfo() {
			this.$state.info.email = '';
			this.$state.info.username = '';
			this.$state.info.theme_id = 1;
			this.$state.info.theme = undefined;
			await logoutUser();
			window.dispatchEvent(
				new CustomEvent('userInfoStored', {
					detail: {
						userInfo: this.$state.info,
					},
				})
			);
		},
	},
});
