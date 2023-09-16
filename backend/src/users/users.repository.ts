import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
	constructor(private prisma: PrismaService) {}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});
	}

	async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({
			where,
			data,
		});
	}

	async deleteUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
		const { where } = params;
		return this.prisma.user.delete({
			where,
		});
	}
}
