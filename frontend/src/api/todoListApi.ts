import http from './http';
import { CreateTodoType, FindAllTodoListsType, UpdateTodoStatusType } from '@/types/types';

export async function findAllTodoLists(query: FindAllTodoListsType) {
	return http.post('/todo-lists/all', query);
}

export async function createTodoList(todo: CreateTodoType) {
	return http.post('/todo-lists', todo);
}

export async function updateTodoList(todo: UpdateTodoStatusType) {
	return http.patch('/todo-lists', todo);
}

export async function deleteTodolist(id: number) {
	return http.delete('todo-lists', { params: { id } });
}
