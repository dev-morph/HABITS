import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

export class WhereTodoListsDto {
	user_email?: string;
	routine_id?: number | null;
	due_day?: Date | string;
	is_complete?: boolean;

	static toPrisma(dto: WhereTodoListsDto): Prisma.TodoListsWhereInput {
		return {
			...dto,
			due_day: new Date(dto.due_day),
		};
	}
}
