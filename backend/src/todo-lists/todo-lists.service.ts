import { Injectable } from '@nestjs/common';
import { CreateTodoListsDto } from './dto/create-todo-lists.dto';
import { UpdateTodoListsDto } from './dto/update-todo-lists.dto';
import { TodoListsRepository } from './todo-lists.repository';
import { WhereTodoListsDto } from './dto/where-todo-lists.dto';

@Injectable()
export class TodoListsService {
	constructor(private repository: TodoListsRepository) {}

	create(todo: CreateTodoListsDto) {
		const prismaDto = CreateTodoListsDto.toPrisma(todo);
		return this.repository.createTodoList(prismaDto);
	}

	findAll(whereInput: WhereTodoListsDto) {
		const prismaDto = WhereTodoListsDto.toPrisma(whereInput);
		return this.repository.getTodoLists({ where: prismaDto });
	}

	findOne(id: number) {
		return `This action returns a #${id} event`;
	}

	update(todo: UpdateTodoListsDto) {
		return this.repository.updateTodoList({ where: { id: todo.id }, data: todo });
	}

	remove(id: number) {
		return `This action removes a #${id} event`;
	}
}
