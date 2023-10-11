import { Injectable } from '@nestjs/common';
import { Prisma, TodoLists } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TodoListsRepository {
	constructor(private prisma: PrismaService) {}
	async createTodoList(data: Prisma.TodoListsCreateInput): Promise<TodoLists> {
		return this.prisma.todoLists.create({
			data,
		});
	}

	async getTodoList(params: { where: Prisma.TodoListsWhereUniqueInput }): Promise<TodoLists> {
		const { where } = params;
		return this.prisma.todoLists.findUnique({
			where,
		});
	}

	async getTodoLists(params: { where: Prisma.TodoListsWhereInput }): Promise<TodoLists[]> {
		const { where } = params;
		return this.prisma.todoLists.findMany({
			where,
		});
	}

	async updateTodoList(params: { where: Prisma.TodoListsWhereUniqueInput; data: Prisma.TodoListsUpdateInput }): Promise<TodoLists> {
		const { where, data } = params;
		return this.prisma.todoLists.update({
			where,
			data,
		});
	}

	async deleteTodoList(params: { where: Prisma.TodoListsWhereUniqueInput }): Promise<TodoLists> {
		const { where } = params;
		return this.prisma.todoLists.delete({
			where,
		});
	}
}
