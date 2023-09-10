import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [HttpModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
