import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepositoy } from './files.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [FilesController],
	providers: [FilesService, FilesRepositoy],
	exports: [FilesService],
})
export class FilesModule {}
