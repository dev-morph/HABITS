import { Injectable } from '@nestjs/common';
import { Prisma, Routine } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoutinesRepository {
	constructor(private prisma: PrismaService) {}

	async createRoutine(data: Prisma.RoutineCreateInput): Promise<Routine> {
		return this.prisma.routine.create({ data });
	}

	async getRoutines(params: { where: Prisma.RoutineWhereInput }): Promise<Routine[]> {
		const { where } = params;
		return this.prisma.routine.findMany({ where });
	}

	async updateRoutine(params: { where: Prisma.RoutineWhereUniqueInput; data: Prisma.RoutineUpdateInput }): Promise<Routine> {
		const { where, data } = params;
		return this.prisma.routine.update({ where, data });
	}

	async deleteRoutine(params: { where: Prisma.RoutineWhereUniqueInput }): Promise<Routine> {
		const { where } = params;
		return this.prisma.routine.delete({ where });
	}
}
