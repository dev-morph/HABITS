import { HttpException, Injectable } from '@nestjs/common';

import { CreateRoutineDto } from './dto/create-routine.dto';

import { UpdateRoutineDto } from './dto/update-routine.dto';

import { Prisma } from '@prisma/client';

import { InvalidArgumentException } from '../exceptions/invalid-arguement.exception';

import * as dayjs from 'dayjs';

import { CreateEventDto } from 'src/events/dto/create-event.dto';

@Injectable()
export class RoutinesService {
	private dateFormat = 'YYYY-MM-DD';
	private undefinedEndDate = '2053-12-31';

	create(createRoutineDto: CreateRoutineDto) {
		return 'This action adds a new routine';
	}

	findAll() {
		return `This action returns all routines`;
	}

	findOne(id: number) {
		return `This action returns a #${id} routine`;
	}

	update(id: number, updateRoutineDto: UpdateRoutineDto) {
		return `This action updates a #${id} routine`;
	}

	remove(id: number) {
		return `This action removes a #${id} routine`;
	}

	generateEventsByRoutine(data: Prisma.RoutineCreateInput) {
		const { start_day, event_day } = data;

		//1. weekly, monthly, yearly 로 분리하여 처리.

		return null;
	}

	generateWeeklyEvents(data: CreateRoutineDto) {
		const result = [];
		const { event_day, start_day, end_day } = data;
		const isEventValid = this.validateWeeklyEventDays(event_day);
		const { startDay, endDay } = this.getValidStartEndDays(start_day, end_day);
		let target = dayjs(startDay);

		while (isEventValid && dayjs(endDay).diff(target) >= 0) {
			if (event_day.includes(target.get('day').toString())) {
				const event = CreateEventDto.of({
					user_email: data.user_email,
					routine_id: 0,
					due_day: target.format('YYYY-MM-DD'),
					title: data.title,
					priority: 0,
					is_complete: false,
				});
				result.push(event);
			}
			target = target.add(1, 'day');
		}
		return result;
	}

	generateMonthlyEvents(data: CreateRoutineDto) {
		const result = [];
		const monthWith31Days = [1, 3, 5, 7, 8, 10, 12];
		const monthWith30Days = [4, 6, 9, 11];
		const specialDays = [31, 30, 29];
		const { event_day, start_day, end_day } = data;
		const isEventValid = this.validateMonthlyEventDays(event_day);
		const { startDay, endDay } = this.getValidStartEndDays(start_day, end_day);
		let target = dayjs(startDay);
		const adjustedEventDays = this.getAdjustedEventDays(event_day);
		while (isEventValid && dayjs(endDay).diff(target) >= 0) {
			let targetEventDays;
			const nowMonth = target.get('month') + 1; // 0 ~ 11
			if (monthWith31Days.includes(nowMonth)) {
				targetEventDays = adjustedEventDays.thirtyOneEventDays;
			} else if (monthWith30Days.includes(nowMonth)) {
				targetEventDays = adjustedEventDays.thirtyEventDays;
			} else {
				//2월 달인 경우,
				const isLeapYear = this.isLeapYear(target.format(this.dateFormat));
				if (isLeapYear) {
					targetEventDays = adjustedEventDays.twentyNineEventDays;
				} else {
					targetEventDays = adjustedEventDays.twentyEightEventDays;
				}
				console.log('#####', targetEventDays, target.get('date').toString());
			}
			if (targetEventDays.includes(target.get('date').toString())) {
				const event = CreateEventDto.of({
					user_email: data.user_email,
					routine_id: 0,
					due_day: target.format('YYYY-MM-DD'),
					title: data.title,
					priority: 0,
					is_complete: false,
				});
				result.push(event);
			}
			target = target.add(1, 'day');
		}

		return result;
	}

	getAdjustedEventDays(eventDays: string[]) {
		const adjustedEventDays = {
			thirtyOneEventDays: [],
			thirtyEventDays: [],
			twentyNineEventDays: [],
			twentyEightEventDays: [],
		};

		for (const eventDay of eventDays) {
			//1. 31, 30, 29 중에 해당하는지 체크한다.
			if (eventDay !== '29' && eventDay !== '30' && eventDay !== '31') {
				adjustedEventDays.thirtyOneEventDays.push(eventDay);
				adjustedEventDays.thirtyEventDays.push(eventDay);
				adjustedEventDays.twentyNineEventDays.push(eventDay);
				adjustedEventDays.twentyEightEventDays.push(eventDay);
				continue;
			} else {
				//29
				if (eventDay === '29') {
					if (adjustedEventDays.thirtyOneEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.thirtyOneEventDays.push(eventDay);
					}
					if (adjustedEventDays.thirtyEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.thirtyEventDays.push(eventDay);
					}
					if (adjustedEventDays.twentyNineEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.twentyNineEventDays.push(eventDay);
					}
					if (adjustedEventDays.twentyEightEventDays.indexOf('28') === -1) {
						adjustedEventDays.twentyEightEventDays.push('28');
					}
				} else if (eventDay === '30') {
					//30
					if (adjustedEventDays.thirtyOneEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.thirtyOneEventDays.push(eventDay);
					}
					if (adjustedEventDays.thirtyEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.thirtyEventDays.push(eventDay);
					}
					if (adjustedEventDays.twentyNineEventDays.indexOf('29') === -1) {
						adjustedEventDays.twentyNineEventDays.push('29');
					}
					if (adjustedEventDays.twentyEightEventDays.indexOf('28') === -1) {
						adjustedEventDays.twentyEightEventDays.push('28');
					}
				} else {
					//31
					if (adjustedEventDays.thirtyOneEventDays.indexOf(eventDay) === -1) {
						adjustedEventDays.thirtyOneEventDays.push(eventDay);
					}
					if (adjustedEventDays.thirtyEventDays.indexOf('30') === -1) {
						adjustedEventDays.thirtyEventDays.push('30');
					}
					if (adjustedEventDays.twentyNineEventDays.indexOf('29') === -1) {
						adjustedEventDays.twentyNineEventDays.push('29');
					}
					if (adjustedEventDays.twentyEightEventDays.indexOf('28') === -1) {
						adjustedEventDays.twentyEightEventDays.push('28');
					}
				}
			}
		}
		return adjustedEventDays;
	}

	isLeapYear(date: string) {
		const year = dayjs(date).get('year');
		if (year % 4 !== 0) return false;
		else {
			if (year % 100 === 0 && year % 400 !== 0) {
				return false;
			}
			return true;
		}
	}

	validateWeeklyEventDays(eventDays: string[]): boolean {
		const validWeeklyEventDays = Array.from({ length: 7 }, (val, idx) => idx.toString());
		for (const day of eventDays) {
			const dayIndex = validWeeklyEventDays.indexOf(day);
			if (dayIndex !== -1) {
				validWeeklyEventDays.splice(dayIndex, 1);
				continue;
			} else {
				throw new InvalidArgumentException("WeeklyEventDays should be from '0' to '6' and not be redundant.");
			}
		}
		return true;
	}

	validateMonthlyEventDays(eventDays: string[]): boolean {
		const validMonthlyEventDays = Array.from({ length: 31 }, (val, idx) => (idx + 1).toString());
		for (const day of eventDays) {
			const dayIndex = validMonthlyEventDays.indexOf(day);
			if (dayIndex !== -1) {
				validMonthlyEventDays.splice(dayIndex, 1);
				continue;
			} else {
				throw new InvalidArgumentException("MonthlyEventDays should be from '1' to '31' and not be redundant.");
			}
		}
		return true;
	}

	getValidStartEndDays(startDay, endDay) {
		const now = dayjs(dayjs().format(this.dateFormat));
		if (!startDay) {
			startDay = now;
		}
		if (!endDay) {
			endDay = dayjs(this.undefinedEndDate, this.dateFormat);
		}
		const start = dayjs(startDay, this.dateFormat);
		const end = dayjs(endDay, this.dateFormat);

		const validDays = {
			startDay: start.format(this.dateFormat),
			endDay: end.format(this.dateFormat),
		};

		const gap = end.diff(start);

		if (gap < 0) {
			throw new InvalidArgumentException('Routine StartDay should be earlier than EndDay.');
		}

		if (start.diff(now) < 0) {
			validDays.startDay = now.format(this.dateFormat);
		}

		if (end.diff(now) < 0) {
			throw new InvalidArgumentException('Routine EndDay should be later than Now.');
		}

		return validDays;
	}
}
