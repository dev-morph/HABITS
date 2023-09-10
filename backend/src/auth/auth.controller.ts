import { Controller, Get, Body, Param, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoCodeDto } from './dto/kakao-code.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/login')
	findAll() {
		console.log('got req');
		return this.authService.findAll();
	}

	@Post('/kakao/login')
	async kakaoLogin(@Body() kakaoLoginDto: KakaoCodeDto) {
		const result = this.authService.kakaoLogin(kakaoLoginDto);
		console.log('controller --', result);
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
