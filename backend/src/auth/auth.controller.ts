import { Controller, Get, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { KakaoLoginDto } from './dto/kakao-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/login')
	findAll() {
		console.log('got req');
		return this.authService.findAll();
	}

	@Get('/kakao/login')
	kakaoLogin() {
		console.log('kakao/login');
		return this.authService.kakaoLogin();
	}
	@Get('/kakao/redirect')
	kakaoRedirect() {
		console.log('kakao/redirect');
		return this.authService.kakaoLogin();
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
