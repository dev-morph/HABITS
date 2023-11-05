import { Injectable } from '@nestjs/common';
import { Prisma, Routines, Themes } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ThemesRepositoy {
	constructor(private prisma: PrismaService) {}

	async createTheme(data: Prisma.ThemesCreateInput): Promise<Themes> {
		return this.prisma.themes.create({ data });
	}

	async findAllThemes() {
		return this.prisma.themes.findMany();
	}

	async getTheme(params: { where: Prisma.ThemesWhereUniqueInput }): Promise<Themes> {
		const { where } = params;
		return this.prisma.themes.findUnique({ where });
	}

	async updateTheme(params: { where: Prisma.ThemesWhereUniqueInput; data: Prisma.ThemesUpdateInput }): Promise<Themes> {
		const { where, data } = params;
		return this.prisma.themes.update({ where, data });
	}

	async deleteTheme(params: { where: Prisma.ThemesWhereUniqueInput }): Promise<Themes> {
		const { where } = params;
		return this.prisma.themes.delete({ where });
	}
}
