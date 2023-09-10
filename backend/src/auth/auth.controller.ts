import { Controller, Get, Body, Param, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoCodeDto } from './dto/kakao-code.dto';
// import { KakaoLoginDto } from './dto/kakao-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/login')
	findAll() {
		console.log('got req');
		return this.authService.findAll();
	}

	@Post('/kakao/login')
	async kakaoToken(@Body() kakaoLoginDto: KakaoCodeDto) {
		console.log('kakao/token', kakaoLoginDto.code);
		const { access_token } = await this.authService.getKakaoToken(kakaoLoginDto.code);
		const result = await this.authService.getKakaoUserInfo(access_token);
		console.log('result is ---> ', result);
		return 'success';
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.authService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authService.remove(+id);
	}
}
