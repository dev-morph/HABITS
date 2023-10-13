import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { RoutinesRepository } from './routines.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/database/prisma.module';

describe('RoutinesRepository', () => {
	let repository: RoutinesRepository;
	let prismaService: PrismaService;
	const routineWeeklyDummy: Prisma.RoutinesCreateInput = {
		user_email: 'weekly@test.com',
		title: 'RUN THE TEST',
		recur_pattern: 'W',
		event_day: '0, 3, 5',
		// start_day: '',
		// end_day: '',
	};
	const routineMonthlyDummy: Prisma.RoutinesCreateInput = {
		user_email: 'monthly@test.com',
		title: 'RUN Montlhy TEST',
		recur_pattern: 'M',
		event_day: '27',
		// start_day: '',
		// end_day: '',
	};
	const routineYearlyDummy: Prisma.RoutinesCreateInput = {
		user_email: 'yearly@test.com',
		title: 'RUN Yearly TEST',
		recur_pattern: 'Y',
		event_day: '9/21, 3/30',
		// start_day: '',
		// end_day: '',
	};

	beforeAll(async () => {});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule],
			providers: [RoutinesRepository, PrismaService],
		}).compile();

		repository = module.get<RoutinesRepository>(RoutinesRepository);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	afterEach(async () => {
		await prismaService.resetDb();
		await prismaService.disconnect();
	});

	describe('루틴 생성', () => {
		it('루틴 정상 생성', async () => {
			const result = await repository.createRoutine(routineWeeklyDummy);
			expect(result.user_email).toEqual(routineWeeklyDummy.user_email);
			expect(result.title).toEqual(routineWeeklyDummy.title);
			expect(result.recur_pattern).toEqual(routineWeeklyDummy.recur_pattern);
			expect(result.event_day).toEqual(routineWeeklyDummy.event_day);
			expect(result.id).not.toBeNull();
			expect(result.created_at).not.toBeNull();
			expect(result.updated_at).not.toBeNull();
			expect(result.start_day).toBeNull();
			expect(result.end_day).toBeNull();
		});
	});

	describe('조건에 맞는 여러 루틴 조회', () => {
		it('루틴 정상 조회 - 일치하는 데이터만 조회 되어야 한다.', async () => {
			const weeklyResult = await repository.createRoutine(routineWeeklyDummy);
			await repository.createRoutine(routineMonthlyDummy);
			const dummyWithNewUser = {
				...routineYearlyDummy,
				user_email: 'newUser@test.com',
			};
			await repository.createRoutine(dummyWithNewUser);
			const result = await repository.getRoutines({ where: { user_email: weeklyResult.user_email } });
			expect(result.length).toBe(1);
			expect(result[0].user_email).toEqual(routineWeeklyDummy.user_email);
			expect(result[0].title).toEqual(routineWeeklyDummy.title);
			expect(result[0].recur_pattern).toEqual(routineWeeklyDummy.recur_pattern);
			expect(result[0].event_day).toEqual(routineWeeklyDummy.event_day);
			expect(result[0].id).not.toBeNull();
		});

		it('루틴 조회 값 없음 - 일치하는 데이터가 없으면 빈 배열로 리턴한다.', async () => {
			const invalidEmail = 'INVALID_EMAIL';
			await repository.createRoutine(routineWeeklyDummy);
			const result = await repository.getRoutines({ where: { user_email: invalidEmail } });
			expect(result.length).toBe(0);
		});
	});

	describe('루틴 업데이트', () => {
		it('루틴 정상 업데이트', async () => {
			const weeklyRecurPattern = 'W';
			const createResult = await repository.createRoutine(routineMonthlyDummy);
			const result = await repository.updateRoutine({ where: { id: createResult.id }, data: { recur_pattern: weeklyRecurPattern } });
			expect(result.recur_pattern).not.toEqual(createResult.recur_pattern);
			expect(result.recur_pattern).toEqual(weeklyRecurPattern);
		});

		it('없는 데이터 업데이트 시도 시 - P2025 Exception 출력', async () => {
			const invalidId = 0;
			const weeklyRecurPattern = 'W';
			const createResult = await repository.createRoutine(routineMonthlyDummy);
			await expect(async () => {
				await repository.updateRoutine({ where: { id: invalidId }, data: { recur_pattern: weeklyRecurPattern } });
			}).rejects.toThrow();

			try {
				await repository.updateRoutine({ where: { id: invalidId }, data: { recur_pattern: weeklyRecurPattern } });
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to update not found.');
			}
		});
	});

	describe('루틴 삭제', () => {
		it('루틴 정상 삭제', async () => {
			const createResult = await repository.createRoutine(routineWeeklyDummy);
			expect(createResult.id).not.toBeNull();
			const deleteRoutine = await repository.deleteRoutine({ where: { id: createResult.id } });
			expect(deleteRoutine.id).toEqual(createResult.id);
			const afterDelete = await repository.getRoutines({ where: { id: createResult.id } });
			expect(afterDelete.length).toBe(0);
		});

		it('없는 데이터 삭제 시도 시 P2025 Exception 출력', async () => {
			const invalidId = 0;
			const createResult = await repository.createRoutine(routineMonthlyDummy);

			await expect(async () => await repository.deleteRoutine({ where: { id: invalidId } })).rejects.toThrow();
			try {
				await repository.deleteRoutine({ where: { id: invalidId } });
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to delete does not exist.');
			}
		});
	});
});
