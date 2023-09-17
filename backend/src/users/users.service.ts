import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private repository: UsersRepository) {}

	async getUserByEmail(email: string): Promise<User | undefined> {
		return this.repository.getUser({ where: { email } });
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.repository.createUser(data);
	}

	async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }) {
		return this.repository.updateUser(params);
	}

	async deleteUser(user: Prisma.UserWhereUniqueInput) {
		return this.repository.deleteUser({
			where: user,
		});
	}
}
