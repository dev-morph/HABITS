export class CreateUserDto {
	email: string;
	username: string;
	password: string;
	gender: 'male' | 'female';
}
