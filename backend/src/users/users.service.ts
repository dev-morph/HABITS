import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	private readonly users = [
		{
			id: 1,
			email: 'john',
			password: 'changeme',
		},
		{
			id: 2,
			email: 'maria',
			password: 'guess',
		},
	];
	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return this.users.filter(user => user.id === id);
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
