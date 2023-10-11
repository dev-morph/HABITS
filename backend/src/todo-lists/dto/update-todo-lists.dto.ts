import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListsDto } from './create-todo-lists.dto';

export class UpdateTodoListsDto extends PartialType(CreateTodoListsDto) {
	id: number;
	is_complete: boolean;
	priority?: number;
	// user_email?: string;
	// routine_id?: number;
	// due_day?: string;
	// title?: string;
	// created_at?: string;
	// updated_at?: string;
}
