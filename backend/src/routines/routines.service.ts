import { HttpException, Injectable } from '@nestjs/common';

import { CreateRoutineDto } from './dto/create-routine.dto';

import { UpdateRoutineDto } from './dto/update-routine.dto';

import { Prisma } from '@prisma/client';

import { InvalidArgumentException } from '../exceptions/invalid-arguement.exception';

import * as dayjs from 'dayjs';

import { CreateEventDto } from 'src/events/dto/create-event.dto';

@Injectable()
export class RoutinesService {
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

	getEventDays(event_day, start_day, end_day) {
		const eventDays = event_day.replace(/ /g, '').split(',');
	}

	generateWeeklyEvents(data: CreateRoutineDto) {
		const result = [];
		const { event_day, start_day, end_day } = data;
		const eventDays = event_day.replace(/ /g, '').split(',');
		const { startDay, endDay } = this.getValidStartEndDays(start_day, end_day);
		let target = dayjs(startDay);

		while (dayjs(endDay).diff(target) >= 0) {
			if (eventDays.includes(target.get('day').toString())) {
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

	getValidStartEndDays(startDay, endDay) {
		const dayFormat = 'YYYY-MM-DD';
		const now = dayjs(dayjs().format(dayFormat));
		if (!startDay) {
			startDay = now;
		}
		if (!endDay) {
			endDay = dayjs('2053-12-31', dayFormat);
		}
		const start = dayjs(startDay, dayFormat);
		const end = dayjs(endDay, dayFormat);

		const validDays = {
			startDay: start.format(dayFormat),
			endDay: end.format(dayFormat),
		};

		const gap = end.diff(start);

		if (gap < 0) {
			throw new InvalidArgumentException('Routine StartDay should be earlier than EndDay.');
		}

		if (start.diff(now) < 0) {
			validDays.startDay = now.format(dayFormat);
		}

		if (end.diff(now) < 0) {
			throw new InvalidArgumentException('Routine EndDay should be later than Now.');
		}

		return validDays;
	}
}
