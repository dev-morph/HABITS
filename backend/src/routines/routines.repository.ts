import { Injectable } from '@nestjs/common';
import { Prisma, Routines } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoutinesRepository {
	constructor(private prisma: PrismaService) {}

	async createRoutine(data: Prisma.RoutinesCreateInput): Promise<Routines> {
		return this.prisma.routines.create({ data });
	}

	async getRoutines(params: { where: Prisma.RoutinesWhereInput }): Promise<Routines[]> {
		const { where } = params;
		console.log('where is ', where);
		return this.prisma.routines.findMany({ where });
	}

	async updateRoutine(params: { where: Prisma.RoutinesWhereUniqueInput; data: Prisma.RoutinesUpdateInput }): Promise<Routines> {
		const { where, data } = params;
		return this.prisma.routines.update({ where, data });
	}

	async deleteRoutine(params: { where: Prisma.RoutinesWhereUniqueInput }): Promise<Routines> {
		const { where } = params;
		return this.prisma.routines.delete({ where });
	}
}
