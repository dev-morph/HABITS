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

export type UserInfoType = {
	username: string;
	email: string;
	theme_id: number;
	theme: ThemeType | undefined;
};

export type UpdateUserType = {
	username: string;
	email: string;
	theme_id?: number;
};

export type CalendarCellType = {
	year: number;
	month: number;
	date: number;
};

export type PopupPositionType = 'top-right' | 'bottom-right';

export type PopupType = 'UserInfo' | 'Config' | null;
export type OpenableType = 'UserInfo' | 'Config';
export type CloseablePopupType = 'UserInfo' | 'Config' | 'All';
export type PopupStateType = {
	openedPopup: PopupType;
};

export type CreateThemeType = {
	title: string;
	background_path: string;
	font_family: string;
	color: string;
	logo_color: string;
	popup_color: string;
};

export type UpdateThemeType = {
	id: number;
	title?: string;
	background_path?: string;
	font_family?: string;
	color?: string;
	logo_color?: string;
	popup_color?: string;
};

export type ThemeType = {
	id: number;
	title: string;
	background_path: string;
	font_family: string;
	color: string;
	logo_color: string;
	popup_color: string;
};
