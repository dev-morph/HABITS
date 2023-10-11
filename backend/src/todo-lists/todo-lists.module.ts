import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsRepository } from './todo-lists.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [TodoListsController],
	providers: [TodoListsService, TodoListsRepository],
})
export class TodoListsModule {}
