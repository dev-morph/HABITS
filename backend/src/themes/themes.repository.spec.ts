import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/database/prisma.module';
import { ThemesRepositoy } from './themes.repository';
import { create } from 'domain';

describe('ThemesRepository', () => {
	let repository: ThemesRepositoy;
	let prismaService: PrismaService;

	const dummyTheme: Prisma.ThemesCreateInput = {
		title: 'dummy_title',
		background_path: 'some_awesome_bg_test_image',
		font_family: 'nice-ff',
		color: 'white',
		logo_color: 'white',
		popup_color: 'background-color',
	};

	beforeAll(async () => {});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [PrismaModule],
			providers: [ThemesRepositoy, PrismaService],
		}).compile();

		repository = module.get<ThemesRepositoy>(ThemesRepositoy);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	afterEach(async () => {
		await prismaService.resetDb();
		await prismaService.disconnect();
	});

	describe('테마 생성', () => {
		it('테마 정상 생성', async () => {
			const result = await repository.createTheme(dummyTheme);
			expect(result.background_path).toEqual(dummyTheme.background_path);
			expect(result.font_family).toEqual(dummyTheme.font_family);
			expect(result.color).toEqual(dummyTheme.color);
			expect(result.logo_color).toEqual(dummyTheme.logo_color);
			expect(result.popup_color).toEqual(dummyTheme.popup_color);
			expect(result.id).not.toBeNull();
		});
	});

	describe('테마 조회', () => {
		it('테마 정상 조회', async () => {
			const createResult = await repository.createTheme(dummyTheme);

			const result = await repository.getTheme({ where: { id: createResult.id } });

			expect(result.background_path).toEqual(dummyTheme.background_path);
			expect(result.font_family).toEqual(dummyTheme.font_family);
			expect(result.color).toEqual(dummyTheme.color);
			expect(result.logo_color).toEqual(dummyTheme.logo_color);
			expect(result.popup_color).toEqual(dummyTheme.popup_color);
			expect(result.id).not.toBeNull();
		});

		it('없는 데이터 조회 시, NULL 리턴', async () => {
			const DUMMY_ID = 12345;
			const result = await repository.getTheme({ where: { id: DUMMY_ID } });
			expect(result).toBeNull();
		});
	});

	describe('테마 수정', () => {
		it('테마 정상 수정', async () => {
			const UPDATED_PATH = 'updated_path';
			const createResult = await repository.createTheme(dummyTheme);

			const result = await repository.updateTheme({ where: { id: createResult.id }, data: { background_path: UPDATED_PATH } });

			expect(result.background_path).toEqual(UPDATED_PATH);
			expect(result.font_family).toEqual(dummyTheme.font_family);
			expect(result.color).toEqual(dummyTheme.color);
			expect(result.logo_color).toEqual(dummyTheme.logo_color);
			expect(result.popup_color).toEqual(dummyTheme.popup_color);
			expect(result.id).not.toBeNull();
		});

		it('없는 데이터 수정 시, P2025 Exception 출력', async () => {
			const DUMMY_ID = 12345;
			const UPDATED_PATH = 'updated_path';
			try {
				await repository.updateTheme({ where: { id: DUMMY_ID }, data: { background_path: UPDATED_PATH } });
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to update not found.');
			}
		});
	});

	describe('테마 삭제', () => {
		it('테마 정상 삭제시, 삭제한 데이터 리턴, 다시 조회시 NUll', async () => {
			const UPDATED_PATH = 'updated_path';
			const createResult = await repository.createTheme(dummyTheme);

			const deleteResult = await repository.deleteTheme({ where: { id: createResult.id } });
			expect(deleteResult.id).toBe(createResult.id);
			const result = await repository.getTheme({ where: { id: createResult.id } });
			expect(result).toBeNull();
		});

		it('없는 데이터 삭제 시도 시 P2025 Exception 출력', async () => {
			const DUMMY_ID = 12345;
			try {
				const deleteResult = await repository.deleteTheme({ where: { id: DUMMY_ID } });
			} catch (error) {
				expect(error.code).toEqual('P2025');
				expect(error.meta.cause).toEqual('Record to delete does not exist.');
			}
		});
	});
});
