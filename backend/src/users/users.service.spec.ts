import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
	let service: UsersService;
	let prismaService: PrismaService;
	let repository: UsersRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService, UsersRepository],
		}).compile();

		service = module.get<UsersService>(UsersService);
		prismaService = module.get<PrismaService>(PrismaService);
		repository = module.get<UsersRepository>(UsersRepository);
	});

	it('1+1', () => {
		expect(1 + 1).toBe(2);
	});
});
