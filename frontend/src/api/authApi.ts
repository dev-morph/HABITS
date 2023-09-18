import http from './http';

export async function login(userInfo: { email: string; password: string }) {
	console.log('got login data', userInfo);
	return http.post('/auth/login', userInfo);
}
export async function signup(userInfo: { email: string; username: string; password: string }) {
	console.log('got signup data', userInfo);
	return http.post('/auth/signup', userInfo);
}
