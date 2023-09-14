import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import { KakaoCodeDto } from './dto/kakao-code.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly httpService: HttpService,
		private usersService: UsersService,
		private configService: ConfigService,
		private jwtService: JwtService
	) {}

	async signIn(email: string, password: string) {
		const user = await this.usersService.findOne(email);
		if (user?.password !== password) {
			throw new UnauthorizedException();
		}
		const payload = { id: user.id, email: user.email };
		const access_token = await this.jwtService.signAsync(payload);
		return { access_token };
	}

	async getCookieWithJwtAccessToken(signInDto: SignInDto) {
		const access_token = await this.jwtService.signAsync(signInDto);
		return {
			accessToken: access_token,
			sameSite: true,
			//maxAge 단위는 ms
			maxAge: this.configService.get('AT_DURATION') * 1000,
		};
	}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(email);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	// ##### 카카오 로그인
	async kakaoLogin(kakaoCodeDto: KakaoCodeDto) {
		//1. getKakaoToken by KakaoAuthCode
		const { access_token } = await this.getKakaoToken(kakaoCodeDto.code);
		//2. getUserInfo from Kakao via Token
		const userInfo = await this.getKakaoUserInfo(access_token);
		console.log('userInfo is ---> ', userInfo);
	}

	async getKakaoToken(code: string) {
		const header = {
			'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		};
		const body = {
			grant_type: 'authorization_code',
			client_id: this.configService.get<string>('KAKAO_CLIENT_ID'),
			redirect_uri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
			code: code,
		};
		const { data }: { data: KakaoTokenDto } = await firstValueFrom(
			this.httpService.post('https://kauth.kakao.com/oauth/token', body, { headers: header })
		);

		return data;
	}

	async getKakaoUserInfo(accessToken: string) {
		const header = {
			Authorization: `Bearer ${accessToken}`,
			'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		};

		const { data } = await firstValueFrom(this.httpService.get('https://kapi.kakao.com/v2/user/me', { headers: header }));
		return data;
	}
}
