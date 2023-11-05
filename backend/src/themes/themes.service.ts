import { Injectable } from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ThemesRepositoy } from './themes.repository';

@Injectable()
export class ThemesService {
	constructor(private repository: ThemesRepositoy) {}

	create(createThemeDto: CreateThemeDto) {
		return this.repository.createTheme(createThemeDto);
	}

	findAll() {
		return this.repository.findAllThemes();
	}

	findOne(id: number) {
		return this.repository.getTheme({ where: { id } });
	}

	update(updateThemeDto: UpdateThemeDto) {
		return this.repository.updateTheme({ where: { id: updateThemeDto.id }, data: updateThemeDto });
	}

	remove(id: number) {
		return this.repository.deleteTheme({ where: { id } });
	}
}
