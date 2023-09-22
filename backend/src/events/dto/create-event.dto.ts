import { Prisma } from '@prisma/client';

export class CreateEventDto {
	routine_id: number;
	due_day: Date | string;
	title: string;
	priority: number;
	is_complete: boolean;
	created_at?: Date | string;
	updated_at?: Date | string;

	static of(dto: Prisma.EventCreateInput) {
		return {
			...dto,
		};
	}
}
