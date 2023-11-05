import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { ThemesRepositoy } from './themes.repository';

@Module({
	imports: [PrismaModule],
	controllers: [ThemesController],
	providers: [ThemesService, ThemesRepositoy],
})
export class ThemesModule {}
