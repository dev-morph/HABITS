import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Prisma } from '@prisma/client';

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
}
