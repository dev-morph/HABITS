import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		console.log('got it');
		return req.user;
	}

	@Post('signup')
	signUp(@Body() userDto: Prisma.UsersCreateInput) {
		return this.usersService.updateUser({ where: { email: 'hoi@hoi.com' }, data: userDto });
		// return this.usersService.createUser(userDto);
	}
}
