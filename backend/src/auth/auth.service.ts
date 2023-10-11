import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import { KakaoCodeDto } from './dto/kakao-code.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, Users } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private readonly httpService: HttpService,
		private usersService: UsersService,
		private configService: ConfigService,
		private jwtService: JwtService
	) {}

	async signUp(userData: Prisma.UsersCreateInput): Promise<Users> {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		return await this.usersService.createUser({ ...userData, password: hashedPassword });
	}

	async signIn(user: Users) {
		const { password, ...payload } = user;
		const access_token = await this.jwtService.signAsync(payload);
		const cookieOptions = this.getCookieOptions();
		return { access_token, ...cookieOptions };
	}

	getCookieOptions() {
		return {
			sameSite: true,
			//maxAge 단위는 ms
			maxAge: this.configService.get('AT_DURATION') * 1000,
		};
	}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.getUserByEmail(email);
		try {
			const validPassword = await this.verifyPassword(password, user.password);
			if (user && validPassword) {
				const { password, ...result } = user;
				return result;
			}
			//비밀 번호가 틀린 경우
			throw new UnauthorizedException('1로그인 인증에 실패 하였습니다.');
		} catch (error) {
			throw new UnauthorizedException('2로그인 인증에 실패 하였습니다.');
		}
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

	// ##### bcrypt
	async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
