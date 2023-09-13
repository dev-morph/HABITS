import { Controller, Get, Body, Param, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoCodeDto } from './dto/kakao-code.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('/login')
	login(@Request() req) {
		console.log('got req', req);
	}

	@Post('/kakao/login')
	async kakaoLogin(@Body() kakaoLoginDto: KakaoCodeDto) {
		const result = this.authService.kakaoLogin(kakaoLoginDto);
		console.log('controller --', result);
		return 'success';
	}
}
