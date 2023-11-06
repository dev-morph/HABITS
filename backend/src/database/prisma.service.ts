import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async resetDb() {
		await this.$transaction([
			this.users.deleteMany(),
			this.routines.deleteMany(),
			this.todoLists.deleteMany(),
			this.themes.deleteMany(),
		]);
	}

	async disconnect() {
		await this.$disconnect();
	}
}
