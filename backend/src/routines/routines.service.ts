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
		while (isEventValid && dayjs(endDay).diff(target) >= 0) {
			const adjustedEventDay = event_day.slice();
			if (monthWith31Days.includes(target.get('month'))) {
				console.log('pass');
			} else if (monthWith30Days.includes(target.get('month'))) {
				const thirtyOneIndex = adjustedEventDay.indexOf('31');
				if (thirtyOneIndex !== -1) {
					adjustedEventDay[thirtyOneIndex] = '30';
				}
			} else {
				//2월 달인 경우,
				const isLeapYear = this.isLeapYear(target.format(this.dateFormat));
				const thirtyOneIndex = adjustedEventDay.indexOf('31');
				const thirtyIndex = adjustedEventDay.indexOf('30');
				const twentyNineIndex = adjustedEventDay.indexOf('29');
				if (thirtyOneIndex !== -1 && thirtyIndex !== -1 && twentyNineIndex !== -1) {
					adjustedEventDay.splice(thirtyOneIndex, 1);
					adjustedEventDay.splice(thirtyIndex, 1);
					adjustedEventDay[twentyNineIndex] = '28';
				} else if (thirtyOneIndex !== -1) {
					adjustedEventDay[thirtyOneIndex] = '28';
				} else if (thirtyIndex !== -1) {
					adjustedEventDay[thirtyIndex] = '28';
				}
			}
			console.log('check', target.format(this.dateFormat), '||', adjustedEventDay);
			if (adjustedEventDay.includes(target.get('date').toString())) {
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

	getAdjustedEventDays({ startDay, endDay, eventDays }: { startDay: string; endDay: string; eventDays: string[] }) {
		console.log('here');
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
