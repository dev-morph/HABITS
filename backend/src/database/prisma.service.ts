import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async resetDb() {
		this.$transaction([this.user.deleteMany(), this.routine.deleteMany(), this.event.deleteMany()]);
	}

	async disconnect() {
		await this.$disconnect();
	}
}
