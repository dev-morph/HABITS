import http from './http';

export async function login(data: string) {
	console.log('got data', data);
	return http.get('/auth/kakao/login');
}
