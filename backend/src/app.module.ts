import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { EventsModule } from './events/events.module';
import { RoutinesModule } from './routines/routines.module';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		EventsModule,
		RoutinesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
