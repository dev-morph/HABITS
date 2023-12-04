import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersRepository } from './users.repository';
import { FilesModule } from 'src/files/files.module';

@Module({
	imports: [PrismaModule, FilesModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	exports: [UsersService],
})
export class UsersModule {}
