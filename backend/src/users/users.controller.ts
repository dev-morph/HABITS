import {
	Controller,
	Request,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	NotImplementedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { multerConfigs } from 'src/multer/multer-config';
import { unlinkSync } from 'fs';
import { FilesService } from 'src/files/files.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly fileService: FilesService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		const { password, ...userInfo } = await this.usersService.getUserByEmail(req.user.email);
		return userInfo;
	}

	@Post('signup')
	signUp(@Body() userDto: Prisma.UsersCreateInput) {
		return this.usersService.updateUser({ where: { email: 'hoi@hoi.com' }, data: userDto });
		// return this.usersService.createUser(userDto);
	}

	@Patch('')
	update(@Body() userDto: UpdateUserDto) {
		return this.usersService.updateUser({ where: { email: userDto.email }, data: userDto });
	}

	@UseGuards(JwtAuthGuard)
	@Post('/upload/image')
	@UseInterceptors(FileInterceptor('file', multerConfigs))
	async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Request() req) {
		const { password, ...userInfo } = await this.usersService.getUserByEmail(req.user.email);
		const { filename, path } = file;

		if (userInfo.profile_id) {
			//기존에 저장되어 있던 이미지 파일 삭제
			const existingFile = await this.fileService.findByFilename(userInfo.profile_id);
			if (existingFile) {
				console.log('file is existing at, ', existingFile);
				unlinkSync(existingFile.path);
			} else {
				console.log('There is no such file');
			}
		}
		console.log('new file is stored at ', path);
		const result = await this.usersService.updateUser({
			where: {
				id: userInfo.id,
			},
			data: {
				profile_file: {
					upsert: {
						create: {
							filename,
							path,
						},
						update: {
							filename,
							path,
						},
					},
				},
			},
		});
		console.log('result is ', result);
		console.log('filename is ', filename);
		// await unlinkSync(path);
	}
}
