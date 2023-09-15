import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}
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
		try {
			return this.prisma.user.create({
				data,
			});
		} catch (error) {
			console.log('ERROR IS ', error);
		}
	}
}
