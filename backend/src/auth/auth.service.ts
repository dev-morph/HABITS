import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

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
