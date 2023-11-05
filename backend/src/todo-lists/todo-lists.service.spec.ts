import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsService } from './todo-lists.service';
import { TodoListsRepository } from './todo-lists.repository';

const mockTodoListRepository = {
	createTodoList: jest.fn(),
	getTodoList: jest.fn(),
	getTodoLists: jest.fn(),
	updateTodoList: jest.fn(),
	deleteTodoList: jest.fn(),
};

describe('TodoListsService', () => {
	let service: TodoListsService;
	let repository: TodoListsRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TodoListsService,
				{
					provide: TodoListsRepository,
					useValue: mockTodoListRepository,
				},
			],
		}).compile();

		service = module.get<TodoListsService>(TodoListsService);
		repository = module.get<TodoListsRepository>(TodoListsRepository);
	});

	it('should be defined', () => {
		expect(1 + 1).toBe(2);
	});
});
