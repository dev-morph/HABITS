import { Controller, Get, Body, Param, Delete, Post, Request, UseGuards, Res, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { KakaoCodeDto } from './dto/kakao-code.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	async login(@Request() request, @Res({ passthrough: true }) res: Response) {
		try {
			const { access_token, ...accessCookieOptions } = await this.authService.signIn(request.user);
			res.cookie('Authentication', access_token, accessCookieOptions);

			const payload = {
				user: request.user.email,
				message: 'Login Success',
			};
			return payload;
		} catch (error) {
			throw new InternalServerErrorException('Failed to Login');
		}
	}

	@Post('/signup')
	async signup(@Body() signupDto: Prisma.UserCreateInput) {
		return this.authService.signUp(signupDto);
	}

	@Post('/kakao/login')
	async kakaoLogin(@Body() kakaoLoginDto: KakaoCodeDto) {
		const result = await this.authService.kakaoLogin(kakaoLoginDto);
		console.log('controller --', result);
		return 'success';
	}
}
