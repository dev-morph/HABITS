import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { Event, Prisma, Routine } from '@prisma/client';
import * as dayjs from 'dayjs';
import { InvalidArgumentException } from 'src/exceptions/invalid-arguement.exception';

describe('RoutinesService', () => {
	let service: RoutinesService;

	const routineWeeklyDummy: Prisma.RoutineCreateInput = {
		user_email: 'weekly@test.com',
		title: 'RUN THE TEST',
		recur_pattern: 'W',
		event_day: '0, 3, 6',
		start_day: dayjs('2023-09-24').format('YYYY-MM-DD'),
		end_day: dayjs('2023-10-2').format('YYYY-MM-DD'),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RoutinesService],
		}).compile();

		service = module.get<RoutinesService>(RoutinesService);
	});

	describe('주간 반복 이벤트 데이터 유효성 검사', () => {
		it('정상 통과', () => {
			const validEventDays = ['1', '2', '6'];
			const result = service.validateWeeklyEventDays(validEventDays);

			expect(result).toBe(true);
		});

		it('0~6 범위 초과 할 시, InvalidArgumentException 출력', () => {
			const invalidEventDays = ['1', '2', '6', '7'];

			expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(
				"InvalidArguments - WeeklyEventDays should be from '0' to '6' and not be redundant."
			);
			expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(InvalidArgumentException);
		});

		it('0~6 범위 내 숫자는 중복되면 안된다., InvalidArgumentException 출력', () => {
			const invalidEventDays = ['1', '0', '2', '6', '2', '3'];

			expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(
				"InvalidArguments - WeeklyEventDays should be from '0' to '6' and not be redundant."
			);
			expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(InvalidArgumentException);
		});
	});

	describe('루틴 시작일과 종료일 유효성 검사', () => {
		const startDay = '2023-09-29';
		const endDay = '2023-09-30';

		const result = {
			startDay: startDay,
			endDay: endDay,
		};

		it('정상체크 - 유효한 날짜가 startDay, endDay에 담겨져 리턴된다.', () => {
			const validDays = service.getValidStartEndDays(startDay, endDay);
			expect(validDays).toEqual(result);
		});

		it('종료일이 시작일 보다 빠르다면, InvalidArguments 출력', () => {
			const invalidEndDay = '2023-09-28';
			expect(() => service.getValidStartEndDays(startDay, invalidEndDay)).toThrow(
				'InvalidArguments - Routine StartDay should be earlier than EndDay.'
			);
			expect(() => service.getValidStartEndDays(startDay, invalidEndDay)).toThrow(InvalidArgumentException);
		});

		it('시작일이 현재시점보다 빠르다면, 시작일로 오늘 날짜가 리턴되게 된다.', () => {
			const earlyStartDay = '1900-09-20';
			const now = dayjs().format('YYYY-MM-DD');
			const validDays = service.getValidStartEndDays(earlyStartDay, endDay);

			expect(validDays.startDay).toBe(now);
			expect(validDays.startDay).not.toBe(earlyStartDay);
		});

		it('종료일이 현재시점보다 빠르다면, InvalidArguments 출력', () => {
			const muchEarlierStartDay = '1900-09-18';
			const earlyEndDay = '1900-09-20';
			const now = dayjs().format('YYYY-MM-DD');

			expect(() => service.getValidStartEndDays(muchEarlierStartDay, earlyEndDay)).toThrow(
				'InvalidArguments - Routine EndDay should be later than Now.'
			);

			expect(() => service.getValidStartEndDays(muchEarlierStartDay, earlyEndDay)).toThrow(InvalidArgumentException);
		});
	});

	describe('루틴으로 이벤트 생성 함수', () => {
		it('주간 반복 이벤트 생성 테스트 - 09/24~ 10/2 기간 총 4개 이벤트 생성, 0(일), 3(수), 6(토)', () => {
			const result = service.generateWeeklyEvents(routineWeeklyDummy);

			expect(result.length).toBe(4);
			expect(result[0].due_day).toBe('2023-09-24');
			expect(result[1].due_day).toBe('2023-09-27');
			expect(result[2].due_day).toBe('2023-09-30');
			expect(result[3].due_day).toBe('2023-10-01');
		});
	});
});
