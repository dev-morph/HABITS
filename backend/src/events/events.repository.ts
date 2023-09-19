import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventsRepository {
	constructor(private prisma: PrismaService) {}
}
