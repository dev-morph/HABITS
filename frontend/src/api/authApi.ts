import http from './http';

export async function login(userInfo: { email: string; password: string }) {
	return http.post('/auth/login', userInfo);
}
export async function signup(userInfo: { email: string; username: string; password: string }) {
	return http.post('/auth/signup', userInfo);
}
