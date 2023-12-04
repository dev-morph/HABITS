import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesRepositoy } from './files.repository';

@Injectable()
export class FilesService {
	constructor(private repository: FilesRepositoy) {}

	create(createFileDto: CreateFileDto) {
		return this.repository.createFile(createFileDto);
	}

	findAll() {
		return this.repository.findAllFiles();
	}

	findById(id: number) {
		return this.repository.getFile({
			where: { id },
		});
	}

	findByFilename(filename: string) {
		return this.repository.getFile({
			where: { filename },
		});
	}

	update(id: number, updateFileDto: UpdateFileDto) {
		return this.repository.updateFile({
			where: { id },
			data: updateFileDto,
		});
	}

	remove(id: number) {
		return this.repository.deleteFile({
			where: { id },
		});
	}
}
