import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoutinesRepository {
	constructor(private prisma: PrismaService) {}
}
