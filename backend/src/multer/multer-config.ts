import { HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfigs = {
	fileFilter: (req: any, file: any, cb: any) => {
		if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
			// Allow storage of file
			cb(null, true);
		} else {
			// Reject file
			cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
		}
	},
	storage: diskStorage({
		// Destination storage path details
		destination: (req: any, file: any, cb: any) => {
			console.log('destination');
			const uploadPath = './src/uploads';
			// Create folder if doesn't exist
			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath);
			}
			cb(null, uploadPath);
		},
		// File modification details
		filename: (req: any, file: any, cb: any) => {
			const extension = file.mimetype.split('/')[1];
			// Calling the callback passing the random name generated with the original extension name
			const profile_id = randomUUID();
			cb(null, `${profile_id}.${extension}`);
		},
	}),
};
