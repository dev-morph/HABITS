import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private readonly users = [
		{
			id: 1,
			email: 'morph',
			password: '!dlgudxo90',
		},
		{
			id: 2,
			email: 'maria',
			password: 'guess',
		},
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}
}
