import { Controller, Get, Body, Param, Delete, Post, Request, UseGuards, Res, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { KakaoCodeDto } from './dto/kakao-code.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
		try {
			const { access_token } = await this.authService.signIn(signInDto.email, signInDto.password);
			const { accessToken, ...accessCookieOptions } = await this.authService.getCookieWithJwtAccessToken(signInDto);
			res.cookie('Authentication', access_token, accessCookieOptions);

			const payload = {
				user: signInDto.email,
				message: 'Login Success',
			};
			return payload;
		} catch (error) {
			throw new InternalServerErrorException('Failed to Login');
		}
	}

	@Post('/kakao/login')
	async kakaoLogin(@Body() kakaoLoginDto: KakaoCodeDto) {
		const result = await this.authService.kakaoLogin(kakaoLoginDto);
		console.log('controller --', result);
		return 'success';
	}
}
