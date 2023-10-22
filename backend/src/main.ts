import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
	app.enableCors({
		// origin: '*',
		origin: ['http://localhost:8080', 'http://habits.co.kr:8080', 'http://habitstest.com:8080/', 'http://habits.co.kr'],
		credentials: true,
	});
	app.use(cookieParser());
	await app.listen(3000);
}
bootstrap();
