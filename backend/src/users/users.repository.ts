import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
	constructor(private prisma: PrismaService) {}

	async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
		return this.prisma.users.create({
			data,
		});
	}

	async getUser(params: { where: Prisma.UsersWhereUniqueInput }): Promise<Users> {
		const { where } = params;
		return this.prisma.users.findUnique({
			where,
		});
	}

	async updateUser(params: { where: Prisma.UsersWhereUniqueInput; data: Prisma.UsersUpdateInput }): Promise<Users> {
		const { where, data } = params;
		return this.prisma.users.update({
			where,
			data,
		});
	}

	async deleteUser(params: { where: Prisma.UsersWhereUniqueInput }): Promise<Users> {
		const { where } = params;
		return this.prisma.users.delete({
			where,
		});
	}
}
