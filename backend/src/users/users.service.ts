import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private repository: UsersRepository) {}

	async getUserByEmail(email: string): Promise<Users | undefined> {
		return this.repository.getUser({ where: { email } });
	}

	async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
		return this.repository.createUser(data);
	}

	async updateUser(params: { where: Prisma.UsersWhereUniqueInput; data: Prisma.UsersUpdateInput }) {
		return this.repository.updateUser(params);
	}

	async deleteUser(user: Prisma.UsersWhereUniqueInput) {
		return this.repository.deleteUser({
			where: user,
		});
	}
}
