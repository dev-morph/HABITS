import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

describe('RoutinesService', () => {
	let service: RoutinesService;
	const routineWeeklyDummy: Prisma.RoutineCreateInput = {
		user_email: 'weekly@test.com',
		title: 'RUN THE TEST',
		recur_pattern: 'W',
		event_day: '0, 3, 5',
		start_day: dayjs().format('YYYY-MM-DD'),
		end_day: dayjs().format('YYYY-MM-DD'),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RoutinesService],
		}).compile();

		service = module.get<RoutinesService>(RoutinesService);
	});

	describe('루틴 Parsing 함수', () => {
		it('Weekly 루틴 테스트', async () => {
			const result = service.generateEventsByRoutine(routineWeeklyDummy);
			expect(result).toBe(0);
		});
	});

	// describe('루틴 조회', () => {
	// 	it('루틴 리스트 조회 by user_email', async () => {

	// 	})
	// })
});
