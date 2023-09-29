import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { Event, Prisma, Routine } from '@prisma/client';
import * as dayjs from 'dayjs';
import { InvalidArgumentException } from 'src/exceptions/invalid-arguement.exception';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { BadGatewayException } from '@nestjs/common';

describe('RoutinesService', () => {
	let service: RoutinesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RoutinesService],
		}).compile();

		service = module.get<RoutinesService>(RoutinesService);
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
				new InvalidArgumentException('Routine StartDay should be earlier than EndDay.')
			);
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
				new InvalidArgumentException('Routine EndDay should be later than Now.')
			);
		});

		it('시작일이 없으면, 현재 시점으로 갈음한다.', () => {
			const now = dayjs().format('YYYY-MM-DD');
			const validDays = service.getValidStartEndDays(undefined, endDay);
			expect(validDays.startDay).toEqual(now);
		});

		it('종료일이 없으면, 2053-12-31 시점으로 갈음한다.', () => {
			const farFuture = dayjs('2053-12-31').format('YYYY-MM-DD');
			const validDays = service.getValidStartEndDays(startDay, undefined);
			expect(validDays.endDay).toEqual(farFuture);
		});

		it('종료일과 시작일이 없으면, 시작일은 현재시점, 종료일은 2053-12-31 시점으로 갈음한다.', () => {
			const now = dayjs().format('YYYY-MM-DD');
			const farFuture = dayjs('2053-12-31').format('YYYY-MM-DD');
			const validDays = service.getValidStartEndDays(undefined, undefined);
			expect(validDays.startDay).toEqual(now);
			expect(validDays.endDay).toEqual(farFuture);
		});
	});

	describe('주간 반복 이벤트', () => {
		const routineWeeklyDummy: CreateRoutineDto = {
			user_email: 'weekly@test.com',
			title: 'RUN THE TEST',
			recur_pattern: 'W',
			event_day: ['0', '3', '6'],
			start_day: dayjs('2023-09-24').format('YYYY-MM-DD'),
			end_day: dayjs('2023-10-2').format('YYYY-MM-DD'),
		};
		describe('주간 반복 이벤트 데이터 유효성 검사', () => {
			it('정상 통과', () => {
				const validEventDays = ['1', '2', '6'];
				const result = service.validateWeeklyEventDays(validEventDays);

				expect(result).toBe(true);
			});

			it('0~6 범위 초과 할 시, InvalidArgumentException 출력', () => {
				const invalidEventDays = ['1', '2', '6', '7'];
				expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(
					new InvalidArgumentException("WeeklyEventDays should be from '0' to '6' and not be redundant.")
				);
			});

			it('0~6 범위 내 숫자는 중복되면 안된다., InvalidArgumentException 출력', () => {
				const invalidEventDays = ['1', '0', '2', '6', '2', '3'];
				expect(() => service.validateWeeklyEventDays(invalidEventDays)).toThrow(
					new InvalidArgumentException("WeeklyEventDays should be from '0' to '6' and not be redundant.")
				);
			});
		});

		describe('주간 반복 이벤트 생성 테스트', () => {
			it('현재 날짜로부터 종료일이 1주일 후인 0(일), 3(수), 6(토) 이벤트 -  총 3개 이벤트 생성', () => {
				const today = dayjs();
				const validRoutine = {
					...routineWeeklyDummy,
					start_day: today.format('YYYY-MM-DD'),
					end_day: today.add(6, 'day').format('YYYY-MM-DD'),
				};
				const result = service.generateWeeklyEvents(validRoutine);

				expect(result.length).toBe(3);
			});

			it('현재 날짜로부터 종료일이 3주일 후인 0(일), 1(월), 3(수), 6(토) 이벤트 -  총 12개 이벤트 생성', () => {
				const today = dayjs();
				const validRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '1', '3', '6'],
					start_day: today.format('YYYY-MM-DD'),
					end_day: today.add(20, 'day').format('YYYY-MM-DD'),
				};
				const result = service.generateWeeklyEvents(validRoutine);

				expect(result.length).toBe(12);
			});

			it('현재 날짜로부터 종료일이 2주일 후인 매일 반복 일정 - 기간 총 14개 생성', () => {
				const today = dayjs();
				const AllDayRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '2', '1', '3', '4', '5', '6'],
					start_day: today.format('YYYY-MM-DD'),
					end_day: today.add(13, 'day').format('YYYY-MM-DD'),
				};
				const result = service.generateWeeklyEvents(AllDayRoutine);

				expect(result.length).toBe(14);
			});

			it('시작날짜가 현재 날짜보다 과거 + 종료일이 현재날짜로부터 5주일 후인 주 6일 반복 일정 - 기간 총 30개 생성', () => {
				const today = dayjs();
				const AllDayRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '2', '1', '3', '5', '6'],
					start_day: dayjs('2002-11-17', 'YYYY-MM-DD').format('YYYY-MM-DD'),
					end_day: today.add(34, 'day').format('YYYY-MM-DD'),
				};
				const result = service.generateWeeklyEvents(AllDayRoutine);
				expect(result.length).toBe(30);
			});
		});
	});

	describe('월간 반복 이벤트', () => {
		describe('월간 반복 이벤트 데이터 유효성 검사', () => {
			it('정상 통과', () => {
				//1 ~ 31
				const month = ['1', '7', '28'];
				const result = service.validateMonthlyEventDays(month);
				expect(result).toBe(true);
			});

			it('1 ~ 31 범위 초과 하는 경우, InvalidArgumentException 출력', () => {
				//1 ~ 31
				const month = ['1', '0', '7', '28'];
				expect(() => service.validateMonthlyEventDays(month)).toThrow(
					new InvalidArgumentException("MonthlyEventDays should be from '1' to '31' and not be redundant.")
				);
			});

			it('1 ~ 31 범위이내 중복값이 있는 경우, InvalidArgumentException 출력', () => {
				//1 ~ 31
				const month = ['1', '2', '7', '28', '7'];
				expect(() => service.validateMonthlyEventDays(month)).toThrow(
					new InvalidArgumentException("MonthlyEventDays should be from '1' to '31' and not be redundant.")
				);
			});
		});
	});

	describe('월간 반복 이벤트 생성', () => {
		describe('윤년 체크 함수', () => {
			it('해당년이 윤년인지 체크', () => {
				const reuslt2023 = service.isLeapYear('2023');
				const reuslt2024 = service.isLeapYear('2024');
				const reuslt2028 = service.isLeapYear('2028');
				const reuslt2150 = service.isLeapYear('2150');
				expect(reuslt2023).toBe(false);
				expect(reuslt2024).toBe(true);
				expect(reuslt2028).toBe(true);
				expect(reuslt2150).toBe(false);
			});

			it('100으로 나누어 떨어지면서, 400으로 나누어 떨어지지 않는 경우 윤년이 아니다.', () => {
				const reuslt2100 = service.isLeapYear('2100');
				const reuslt24000 = service.isLeapYear('24000');
				expect(reuslt2100).toBe(false);
				expect(reuslt24000).toBe(false);
			});
		});

		describe('달에 맞는 날짜 지정. 매월 31일 반복 -> 4월 30일, 매월 30일 반복 -> 2월 28일', () => {
			it('윤년 체크 함수', () => {});
		});
	});
});
