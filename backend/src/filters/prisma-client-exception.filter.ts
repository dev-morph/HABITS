import { ArgumentsHost, Catch, ExceptionFilter, HttpServer, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		console.error(exception.message);
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const message = exception.message.replace(/\n/g, '');
		console.log('###', exception.meta.cause, '$$$');

		switch (exception.code) {
			case 'P2002': {
				const status = HttpStatus.CONFLICT;
				response.status(status).json({
					statusCode: status,
					message: message,
				});
				break;
			}
			case 'P2025': {
				const status = HttpStatus.BAD_REQUEST;
				response.status(status).json({
					statusCode: status,
					message:
						exception.meta.cause ||
						'An operation failed because it depends on one or more records that were required but not found. Record to update not found.',
				});
				break;
			}
			default:
				// default 500 error code
				super.catch(exception, host);
				break;
		}
	}
}
