import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Prisma, Users } from '@prisma/client';

const mockUserRepository = {
	getUser: jest.fn(),
	createUser: jest.fn(), // Mock the createUser function
	updateUser: jest.fn(),
	deleteUser: jest.fn(),
};

describe('UsersService', () => {
	let service: UsersService;
	let repository: UsersRepository;
	let dummyUser: Prisma.UsersCreateInput;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UsersRepository,
					useValue: mockUserRepository,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		repository = module.get<UsersRepository>(UsersRepository);
		dummyUser = {
			username: 'hoihoi',
			email: 'morph',
			password: '!dlgudxo90',
		};
	});

	afterEach(async () => {
		jest.clearAllMocks();
	});

	describe('유저 조회', () => {
		it('유저 정상 조회', async () => {
			const getResult = { id: 1, ...dummyUser };
			mockUserRepository.getUser.mockImplementation(() => getResult);
			const result = await service.getUserByEmail(dummyUser.email);
			expect(result).toBe(getResult);
		});
	});

	describe('유저 생성', () => {
		it('유저 회원가입', async () => {
			const createResult: Users = { id: 1, ...dummyUser, created_at: new Date(), updated_at: new Date() };
			mockUserRepository.createUser.mockImplementation(() => createResult);
			const result = await service.createUser(dummyUser);
			expect(result).toBe(createResult);
		});
	});

	describe('유저 업데이트', () => {
		it('유저 정상 업데이트', async () => {
			const updateResult = { id: 1, ...dummyUser, created_at: new Date(), updated_at: new Date() };
			mockUserRepository.updateUser.mockImplementation(() => updateResult);
			const result = await service.updateUser({ where: dummyUser, data: dummyUser });
			expect(result).toBe(updateResult);
		});
	});

	describe('유저 삭제', () => {
		it('유저 정상 삭제', async () => {
			mockUserRepository.deleteUser.mockImplementation(() => null);
			const result = await service.deleteUser(dummyUser);
			expect(result).toBeNull();
		});
	});
});
