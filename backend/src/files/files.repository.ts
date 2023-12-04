import { Injectable } from '@nestjs/common';
import { Files, Prisma, Themes } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FilesRepositoy {
	constructor(private prisma: PrismaService) {}

	async createFile(data: Prisma.FilesCreateInput): Promise<Files> {
		return this.prisma.files.create({ data });
	}

	async findAllFiles() {
		return this.prisma.files.findMany();
	}

	async getFile(params: { where: Prisma.FilesWhereUniqueInput }): Promise<Files> {
		const { where } = params;
		return this.prisma.files.findUnique({ where });
	}

	async updateFile(params: { where: Prisma.FilesWhereUniqueInput; data: Prisma.FilesUpdateInput }): Promise<Files> {
		const { where, data } = params;
		return this.prisma.files.update({ where, data });
	}

	async deleteFile(params: { where: Prisma.FilesWhereUniqueInput }): Promise<Files> {
		const { where } = params;
		return this.prisma.files.delete({ where });
	}
}
