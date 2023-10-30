import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { CreateTodoListsDto } from './dto/create-todo-lists.dto';
import { UpdateTodoListsDto } from './dto/update-todo-lists.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WhereTodoListsDto } from './dto/where-todo-lists.dto';

@Controller('todo-lists')
export class TodoListsController {
	constructor(private readonly service: TodoListsService) {}

	@UseGuards(JwtAuthGuard)
	@Post('')
	create(@Body() createTodoListsDto: CreateTodoListsDto) {
		return this.service.create(createTodoListsDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/all')
	findAll(@Request() request, @Body() whereInput: WhereTodoListsDto) {
		const { id, email } = request.user;
		console.log('id is', id, 'email is', email, whereInput.due_day);
		whereInput.user_email = email;
		return this.service.findAll(whereInput);
	}

	@Patch('')
	update(@Body() updateTodoListsDto: UpdateTodoListsDto) {
		return this.service.update(updateTodoListsDto);
	}

	@Delete('')
	remove(@Query('id') id: number) {
		return this.service.remove(+id);
	}
}
