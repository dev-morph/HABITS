import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
	username: string;
	email: string;
	theme_id: number;
	profile_id: number;
}
