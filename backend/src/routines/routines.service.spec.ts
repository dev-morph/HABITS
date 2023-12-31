import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { TodoLists, Prisma, Routines } from '@prisma/client';
import * as dayjs from 'dayjs';
import { InvalidArgumentException } from 'src/exceptions/invalid-arguement.exception';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { BadGatewayException } from '@nestjs/common';

describe('RoutinesService', () => {
	let service: RoutinesService;
	const dateFormat = 'YYYY-MM-DD';

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RoutinesService],
		}).compile();

		service = module.get<RoutinesService>(RoutinesService);
	});

	// afterEach(async () => {
	// 	await prism
	// })

	describe('루틴 시작일과 종료일 유효성 검사', () => {
		const today = dayjs();
		const startDay = today.format(dateFormat);
		const endDay = today.add(3, 'day').format(dateFormat);

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
			const now = dayjs().format(dateFormat);
			const validDays = service.getValidStartEndDays(earlyStartDay, endDay);

			expect(validDays.startDay).toBe(now);
			expect(validDays.startDay).not.toBe(earlyStartDay);
		});

		it('종료일이 현재시점보다 빠르다면, InvalidArguments 출력', () => {
			const muchEarlierStartDay = '1900-09-18';
			const earlyEndDay = '1900-09-20';
			const now = dayjs().format(dateFormat);

			expect(() => service.getValidStartEndDays(muchEarlierStartDay, earlyEndDay)).toThrow(
				new InvalidArgumentException('Routine EndDay should be later than Now.')
			);
		});

		it('시작일이 없으면, 현재 시점으로 갈음한다.', () => {
			const now = dayjs().format(dateFormat);
			const validDays = service.getValidStartEndDays(undefined, endDay);
			expect(validDays.startDay).toEqual(now);
		});

		it('종료일이 없으면, 2053-12-31 시점으로 갈음한다.', () => {
			const farFuture = dayjs('2053-12-31').format(dateFormat);
			const validDays = service.getValidStartEndDays(startDay, undefined);
			expect(validDays.endDay).toEqual(farFuture);
		});

		it('종료일과 시작일이 없으면, 시작일은 현재시점, 종료일은 2053-12-31 시점으로 갈음한다.', () => {
			const now = dayjs().format(dateFormat);
			const farFuture = dayjs('2053-12-31').format(dateFormat);
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
			start_day: dayjs('2023-09-24').format(dateFormat),
			end_day: dayjs('2023-10-2').format(dateFormat),
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
					start_day: today.format(dateFormat),
					end_day: today.add(6, 'day').format(dateFormat),
				};
				const result = service.generateWeeklyEvents(validRoutine);

				expect(result.length).toBe(3);
			});

			it('현재 날짜로부터 종료일이 3주일 후인 0(일), 1(월), 3(수), 6(토) 이벤트 -  총 12개 이벤트 생성', () => {
				const today = dayjs();
				const validRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '1', '3', '6'],
					start_day: today.format(dateFormat),
					end_day: today.add(20, 'day').format(dateFormat),
				};
				const result = service.generateWeeklyEvents(validRoutine);
				expect(result.length).toBe(12);
			});

			it('현재 날짜로부터 종료일이 2주일 후인 매일 반복 일정 - 기간 총 14개 생성', () => {
				const today = dayjs();
				const AllDayRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '2', '1', '3', '4', '5', '6'],
					start_day: today.format(dateFormat),
					end_day: today.add(13, 'day').format(dateFormat),
				};
				const result = service.generateWeeklyEvents(AllDayRoutine);

				expect(result.length).toBe(14);
			});

			it('시작날짜가 현재 날짜보다 과거 + 종료일이 현재날짜로부터 5주일 후인 주 6일 반복 일정 - 기간 총 30개 생성', () => {
				const today = dayjs();
				const AllDayRoutine = {
					...routineWeeklyDummy,
					event_day: ['0', '2', '1', '3', '5', '6'],
					start_day: dayjs('2002-11-17', dateFormat).format(dateFormat),
					end_day: today.add(34, 'day').format(dateFormat),
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

	describe('월 말일 조정 테스트', () => {
		const dummyResult = {
			thirtyOneEventDays: [],
			thirtyEventDays: [],
			twentyNineEventDays: [],
			twentyEightEventDays: [],
		};
		it('이벤트 발생일을 입력하면, 조정된 이벤트 날짜 리턴 - 1', () => {
			const expectResult = {
				thirtyOneEventDays: ['31'],
				thirtyEventDays: ['30'],
				twentyNineEventDays: ['29'],
				twentyEightEventDays: ['28'],
			};
			const result = service.getAdjustedEventDays(['31']);
			expect(result).toEqual(expectResult);
		});
		it('이벤트 발생일을 입력하면, 조정된 이벤트 날짜 리턴 - 2', () => {
			const expectResult = {
				thirtyOneEventDays: ['29', '31'],
				thirtyEventDays: ['29', '30'],
				twentyNineEventDays: ['29'],
				twentyEightEventDays: ['28'],
			};
			const result = service.getAdjustedEventDays(['29', '31']);
			expect(result).toEqual(expectResult);
		});
		it('이벤트 발생일을 입력하면, 조정된 이벤트 날짜 리턴 - 3', () => {
			const expectResult = {
				thirtyOneEventDays: ['1', '27', '28', '30', '31'],
				thirtyEventDays: ['1', '27', '28', '30'],
				twentyNineEventDays: ['1', '27', '28', '29'],
				twentyEightEventDays: ['1', '27', '28'],
			};
			const result = service.getAdjustedEventDays(['1', '27', '28', '30', '31']);
			expect(result).toEqual(expectResult);
		});
	});

	describe('월간 반복 이벤트 생성', () => {
		const today = dayjs('2055-01-01');
		const dummyRoutineDto: CreateRoutineDto = {
			user_email: 'test@Test.com',
			title: '코딩하기',
			recur_pattern: 'M',
			event_day: ['29'],
			start_day: today.format(dateFormat),
			end_day: today.add(1, 'year').format(dateFormat),
		};
		it('특정 날로부터 1년간 반복되는 루틴 생성 시, 12개의 이벤트 생성', () => {
			const result = service.generateMonthlyEvents(dummyRoutineDto);
			expect(result.length).toEqual(12);
		});

		it('반복일자가 29일 이후면서 윤년이 아닌 경우, 2월에 생성되는 이벤트는 28일이다.', () => {
			const notLeapYearDummyRoutine = {
				user_email: 'test@Test.com',
				title: '코딩하기',
				recur_pattern: 'M',
				event_day: ['29'],
				start_day: today.format(dateFormat),
				end_day: today.add(1, 'year').format(dateFormat),
			};

			const result = service.generateMonthlyEvents(notLeapYearDummyRoutine);
			expect(dayjs(result[1].due_day).get('date')).toEqual(28);
			expect(dayjs(result[0].due_day).get('date')).toEqual(29);
		});

		it('반복일자가 29일 이후면서, 윤년인 경우, 2월에 생성되는 이벤트는 29일이다.', () => {
			const leapYear = dayjs('2052-01-01');
			const leapYearDummyRoutine = {
				user_email: 'test@Test.com',
				title: '코딩하기',
				recur_pattern: 'M',
				event_day: ['31'],
				start_day: leapYear.format(dateFormat),
				end_day: leapYear.add(1, 'year').format(dateFormat),
			};

			const result = service.generateMonthlyEvents(leapYearDummyRoutine);
			expect(dayjs(result[1].due_day).get('date')).toEqual(29);
			expect(dayjs(result[3].due_day).get('date')).toEqual(30);
			expect(dayjs(result[4].due_day).get('date')).toEqual(31);
		});

		it('반복일자가 2일, 5일인 경우, 1년간 생성되는 이벤트는 24개이다.', () => {
			const leapYear = dayjs('2052-01-01');
			const leapYearDummyRoutine = {
				user_email: 'test@Test.com',
				title: '코딩하기',
				recur_pattern: 'M',
				event_day: ['2', '5'],
				start_day: leapYear.format(dateFormat),
				end_day: leapYear.add(1, 'year').format(dateFormat),
			};

			const result = service.generateMonthlyEvents(leapYearDummyRoutine);
			expect(result.length).toBe(24);
		});

		it('반복일자가 유효하지 않은 값이 전달 되면, Exception을 던진다. ', () => {
			const leapYear = dayjs('2052-01-01');
			const leapYearDummyRoutine = {
				user_email: 'test@Test.com',
				title: '코딩하기',
				recur_pattern: 'M',
				event_day: ['2', '0'],
				start_day: leapYear.format(dateFormat),
				end_day: leapYear.add(1, 'year').format(dateFormat),
			};

			expect(() => service.generateMonthlyEvents(leapYearDummyRoutine)).toThrow(
				new InvalidArgumentException("MonthlyEventDays should be from '1' to '31' and not be redundant.")
			);
		});
	});

	describe('루틴 dto로 이벤트 생성', () => {
		it('주간 반복 루틴 - 3주간 주에 3번씩 반복되는 발생하는 경우 총 9개의 이벤트를 만든다.', () => {
			const today = dayjs();
			const routineWeeklyDummy: CreateRoutineDto = {
				user_email: 'weekly@test.com',
				title: 'RUN THE TEST',
				recur_pattern: 'W',
				event_day: ['0', '3', '4'],
				start_day: today.format(dateFormat),
				end_day: today.add(20, 'day').format(dateFormat),
			};
			const result = service.generateEventsByRoutine(routineWeeklyDummy);
			expect(result.length).toBe(9);
		});
		it('월간 반복 루틴 - 2년간 월에 3번씩 반복되는 발생하는 경우 총 72개의 이벤트를 만든다.', () => {
			const today = dayjs();
			const routineWeeklyDummy: CreateRoutineDto = {
				user_email: 'weekly@test.com',
				title: 'RUN THE TEST',
				recur_pattern: 'M',
				event_day: ['1', '3', '4'],
				start_day: today.format(dateFormat),
				end_day: today.add(2, 'year').format(dateFormat),
			};
			const result = service.generateEventsByRoutine(routineWeeklyDummy);
			expect(result.length).toBe(72);
		});
		it("recur_pattern은 'W','M','Y'중 하나이어야 한다.", () => {
			const today = dayjs();
			const routineWeeklyDummy: CreateRoutineDto = {
				user_email: 'weekly@test.com',
				title: 'RUN THE TEST',
				recur_pattern: 'Z',
				event_day: ['1', '3', '4'],
				start_day: today.format(dateFormat),
				end_day: today.add(2, 'year').format(dateFormat),
			};
			expect(() => service.generateEventsByRoutine(routineWeeklyDummy)).toThrow(
				new InvalidArgumentException("recur_pattern should be one of 'W', 'M' or 'Y'.")
			);
		});
	});
});
