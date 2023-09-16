import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private repository: UsersRepository
	) {}
	private readonly users = [
		{
			id: 1,
			email: 'morph',
			password: '!dlgudxo90',
		},
		{
			id: 2,
			email: 'maria',
			password: 'guess',
		},
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.repository.createUser(data);
	}

	async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
		return this.repository.updateUser(params);
	}
}
