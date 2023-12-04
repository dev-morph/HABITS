import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { RoutinesModule } from './routines/routines.module';
import { ThemesModule } from './themes/themes.module';
import { FilesModule } from './files/files.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TodoListsModule,
		RoutinesModule,
		ThemesModule,
		FilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
