export type CreateTodoType = {
	user_email: string;
	routine_id?: number;
	due_day: string;
	title: string;
	priority: number;
	is_complete: boolean;
};

export type FindAllTodoListsType = {
	// user_email: string;
	due_day: string;
};

export type UpdateTodoStatusType = {
	id: number;
	is_complete: boolean;
	priority?: number;
	// user_email?: string;
	// routine_id?: number;
	// due_day?: string;
};

export type TodoListType = {
	id: number;
	user_email: string;
	routine_id?: number;
	due_day: string;
	title: string;
	priority: number;
	is_complete: boolean;
};

export type UserType = {
	username: string;
	email: string;
};

export type UpdateUserType = {
	username: string;
	email: string;
};
