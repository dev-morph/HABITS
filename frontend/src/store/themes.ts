import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { findAllThemes } from '@/api/themeApi';
import { UpdateUserType, ThemeType } from '@/types/types';

export const useThemesStore = defineStore({
	id: 'themes',
	state: () => ({
		themeList: [] as ThemeType[],
	}),
	getters: {
		fullThemeList: state => state.themeList,
		backgroundList: state => state.themeList.map(theme => theme.background_path),
		findThemeByid: state => {
			return (themeId: number) => state.themeList.filter(theme => theme.id === themeId);
		},
	},
	actions: {
		async getAllThemes() {
			const { data } = await findAllThemes();
			this.$state.themeList = data;
			console.log('data, ', data);
			console.log('themeList, ', this.$state.themeList);
		},

		setBackgroundImage(imgName?: string) {
			let bgPath = '/imgs/';
			if (!imgName) {
				const user = localStorage.getItem('user');
				if (user) {
					const parsedUser: UpdateUserType = JSON.parse(user);
					const userTheme = this.$state.themeList.find(theme => theme.id === parsedUser.theme_id);
					bgPath += userTheme?.background_path;
				}
			} else {
				bgPath += imgName;
			}
			const bgUrl = `url(${bgPath})`;
			document.documentElement.style.setProperty('--bg-image-url', bgUrl);
		},
		async getCurrentTheme(): Promise<ThemeType> {
			const userStore = useUserStore();
			await userStore.getUserInfo();
			const targetId = userStore.userInfo.theme_id ?? 26;
			return this.$state.themeList.find(theme => theme.id === targetId) as ThemeType;
		},
	},
});
