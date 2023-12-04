import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { getUserDetail } from '@/api/userApi';
import { logoutUser } from '@/api/authApi';
import { UserInfoType, ThemeType } from '@/types/types';
import router from '@/router';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		info: useStorage('user', {
			username: '',
			email: '',
			theme_id: 1,
			theme: undefined as ThemeType | undefined,
			profile_id: null as string | null,
			profile_image: null as File | null,
		}),
	}),
	getters: {
		userInfo: state => state.info,
		curTheme: state => state.info.theme,
	},
	actions: {
		async getUserInfo() {
			try {
				const { data } = await getUserDetail();
				console.log('got getUserDetail', data);
				if (!data.profile_id) {
					data.profile_image = 'default_profile_image.png';
				}
				this.$state.info = data;
				window.dispatchEvent(
					new CustomEvent('userInfoStored', {
						detail: {
							userInfo: data,
						},
					})
				);
			} catch (error) {
				router.push('/login');
			}
		},

		storeUserInfo(user: UserInfoType) {
			this.$state.info = user;
		},

		setBg(theme?: ThemeType) {
			let bgPath = '/imgs/';
			console.log('got setBg', this.curTheme, theme);
			if (theme) {
				bgPath += theme.background_path;
			} else {
				if (this.curTheme) {
					bgPath += this.curTheme?.background_path;
				} else {
					bgPath += 'starry_night_bg.webp';
				}
			}
			const bgUrl = `url(${bgPath})`;
			// const bgUrl = `url(${'black'})`;
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
