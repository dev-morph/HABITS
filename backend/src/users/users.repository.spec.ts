import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/database/prisma.service';
import resetDb from 'src/tests/helpers/reset-db';

describe('UsersRepository', () => {
	let repository: UsersRepository;
	let prismaService: PrismaService;
	const userData = {
		username: 'testuser',
		email: 'test@test.com',
		password: 'hoi',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, PrismaService],
		}).compile();

		repository = module.get<UsersRepository>(UsersRepository);
		prismaService = module.get<PrismaService>(PrismaService);
	});
	afterEach(async () => {
		await resetDb();
	});

	describe('유저 생성', () => {
		//1. user를 넣었을 때, 리턴 값으로 온 객체의 username이 같아야 한다.
		it('user 정상 생성', async () => {
			const result = await repository.createUser(userData);
			expect(result.username).toEqual(userData.username);
			expect(result.email).toEqual(userData.email);
			expect(result.password).toEqual(userData.password);
			expect(result.id).not.toBeNull();
			expect(result.created_at).not.toBeNull();
			expect(result.updated_at).not.toBeNull();
		});

		it('unique값 중복 시 P2002 Exception 출력', async () => {
			await repository.createUser(userData);
			try {
				await repository.createUser(userData);
			} catch (error) {
				expect(error.code).toBe('P2002');
			}
			// await expect(() => repository.createUser(userData)).rejects.toThrow();
		});
	});

	describe('유저 조회', () => {
		it('정상 조회', async () => {
			await repository.createUser(userData);
			const result = await repository.getUserByEmail(userData.email);
			expect(result.username).toEqual(userData.username);
			expect(result.email).toEqual(userData.email);
			expect(result.password).toEqual(userData.password);
			expect(result.id).not.toBeNull();
			expect(result.created_at).not.toBeNull();
			expect(result.updated_at).not.toBeNull();
		});

		it('조회 결과 없는 경우 Null 리턴 해야 한다.', async () => {
			await repository.createUser(userData);
			const result = await repository.getUserByEmail(userData.username);
			expect(result).toBeNull();
		});
	});

	describe('유저 업데이트', () => {
		const updatedUserName = 'hoihoihoi!';
		it('정상 업데이트', async () => {
			await repository.createUser(userData);
			const result = await repository.updateUser({
				where: { email: userData.email },
				data: {
					username: updatedUserName,
				},
			});

			expect(result.username).toEqual(updatedUserName);
		});

		it('없는 데이터 없데이트 시도 시 P2025 Exception 출력', async () => {
			try {
				const result = await repository.updateUser({
					where: { email: userData.email },
					data: {
						username: updatedUserName,
					},
				});
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to update not found.');
			}
		});
	});

	describe('유저 삭제', () => {
		it('정상 삭제', async () => {
			const createdUser = await repository.createUser(userData);
			expect(createdUser.id).not.toBeNull();
			const deleteResult = await repository.deleteUser({ where: { email: userData.email } });
			expect(deleteResult.id).toEqual(createdUser.id);
			const deletedUser = await repository.getUserByEmail(userData.email);
			expect(deletedUser).toBeNull();
			const afterDelete = await repository.getUserByEmail(userData.email);
			expect(afterDelete).toBeNull();
		});

		it('없는 데이터 삭제 시도 시 P2025 Exception 출력', async () => {
			try {
				const deletedUser = await repository.deleteUser({ where: { email: userData.email } });
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to delete does not exist.');
			}
		});
	});
});
