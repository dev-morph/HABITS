import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KakaoTokenDto } from './dto/kakao-token.dto';

@Injectable()
export class AuthService {
	constructor(private readonly httpService: HttpService) {}

	async kakaoLogin() {
		const REST_API_KEY = '7f332480448237d4e5f2621be7c37d6e';
		const REDIRECT_URI = 'http://localhost:8080/oauth/kakao/redirect';
		const result = await this.httpService.get(
			`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
		);
		console.log(result);
		return result;
	}

	async getKakaoToken(code: string) {
		const header = {
			'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		};
		const body = {
			grant_type: 'authorization_code',
			client_id: '575390a4143a27e118615cdc0cbe00c8',
			redirect_uri: 'http://localhost:8080/oauth/kakao/redirect',
			code: code,
			client_secret: 'feUgCSldLvAAqd16F7qS21H0Jr8XqlNZ',
		};
		const { data }: { data: KakaoTokenDto } = await firstValueFrom(
			this.httpService.post('https://kauth.kakao.com/oauth/token', body, { headers: header })
		);
		console.log('result is ', data);
		return data;
	}

	async getKakaoUserInfo(accessToken: string) {
		const header = {
			Authorization: `Bearer ${accessToken}`,
			'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		};

		const { data } = await firstValueFrom(this.httpService.get('https://kapi.kakao.com/v2/user/me', { headers: header }));
		console.log('userInfo data is ---> ', data);
		return data;
	}
	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}
}
