import http from './http';
import { CreateThemeType, UpdateThemeType } from '@/types/types';

export async function findAllThemes() {
	return http.get('/themes');
}

export async function createTheme(theme: CreateThemeType) {
	return http.post('/themes', theme);
}

export async function updateTheme(theme: UpdateThemeType) {
	return http.patch('/themes', theme);
}

export async function deleteTheme(id: number) {
	return http.delete('themes', { params: { id } });
}
