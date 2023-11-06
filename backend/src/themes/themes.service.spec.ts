import { Test, TestingModule } from '@nestjs/testing';
import { ThemesService } from './themes.service';
import { ThemesRepositoy } from './themes.repository';

const mockRepository = {
	createTheme: jest.fn(),
	findAllThemes: jest.fn(),
	getTheme: jest.fn(),
	updateTheme: jest.fn(),
	deleteTheme: jest.fn(),
};

describe('ThemesService', () => {
	let service: ThemesService;
	let repository: ThemesRepositoy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ThemesService,
				{
					provide: ThemesRepositoy,
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<ThemesService>(ThemesService);
		repository = module.get<ThemesRepositoy>(ThemesRepositoy);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
