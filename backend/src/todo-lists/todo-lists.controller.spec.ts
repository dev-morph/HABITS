import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';

describe('TodoListsController', () => {
	let controller: TodoListsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodoListsController],
			providers: [TodoListsService],
		}).compile();

		controller = module.get<TodoListsController>(TodoListsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
