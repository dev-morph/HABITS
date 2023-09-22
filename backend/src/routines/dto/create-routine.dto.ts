export class CreateRoutineDto {
	user_email: string;
	title: string;
	recur_pattern: string;
	event_day: string;
	start_day?: Date | string | null;
	end_day?: Date | string | null;
	created_at?: Date | string;
	updated_at?: Date | string;
}
