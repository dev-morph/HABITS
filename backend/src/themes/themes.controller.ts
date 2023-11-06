import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Controller('themes')
export class ThemesController {
	constructor(private readonly service: ThemesService) {}

	@Post()
	create(@Body() createThemeDto: CreateThemeDto) {
		return this.service.create(createThemeDto);
	}

	@Get()
	findAll() {
		return this.service.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(+id);
	}

	@Patch('')
	update(@Body() updateThemeDto: UpdateThemeDto) {
		return this.service.update(updateThemeDto);
	}

	@Delete('')
	remove(@Query('id') id: number) {
		return this.service.remove(+id);
	}
}
