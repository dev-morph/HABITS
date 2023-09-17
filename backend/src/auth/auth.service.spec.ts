import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

const mockHttpService = {
	get: jest.fn(),
	post: jest.fn(),
};
const mockUserService = {
	createUser: jest.fn(),
	getUserByEmail: jest.fn(),
};
describe('AuthService', () => {
	let service: AuthService;
	let httpService: HttpService;
	let usersService: UsersService;
	let configService: ConfigService;
	let jwtService: JwtService;
	const dummyUser: Prisma.UserCreateInput = {
		email: 'hoi@hoi.com',
		username: 'myNameIsHoi',
		password: 'HOIHOIHOI',
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			// imports: [
			// 	JwtModule.registerAsync({
			// 		imports: [ConfigModule],
			// 		useFactory: async (configService: ConfigService) => ({
			// 			global: true,
			// 			secret: configService.get('JWT_SECRET'),
			// 			signOptions: { expiresIn: configService.get('AT_DURATION') + 's' },
			// 		}),
			// 		inject: [ConfigService],
			// 	}),
			// ],
			providers: [
				AuthService,
				ConfigService,
				JwtService,
				{
					provide: HttpService,
					useValue: mockHttpService,
				},
				{
					provide: UsersService,
					useValue: mockUserService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		httpService = module.get<HttpService>(HttpService);
		usersService = module.get<UsersService>(UsersService);
		configService = module.get<ConfigService>(ConfigService);
		jwtService = module.get<JwtService>(JwtService);
	});

	afterEach(async () => {
		jest.clearAllMocks();
	});

	describe('bcrypt', () => {
		it('정상 패스워드 검사 시 TRUE 리턴', async () => {
			const password = 'HOIHOI';
			const hashedPW = await bcrypt.hash(password, 10);
			const result = await service.verifyPassword(password, hashedPW);
			expect(result).toBe(true);
		});
		it('잘못된 패스워드 검사 시 FALSE 리턴', async () => {
			const password = 'HOIHOI';
			const wrongPW = 'HOI';
			const hashedPW = await bcrypt.hash(password, 10);
			const result = await service.verifyPassword(wrongPW, hashedPW);
			expect(result).toBe(false);
		});
		it('잘못된 해쉬 값으로 검사 시 FALSE 리턴', async () => {
			const password = 'HOIHOI';
			const wrongPW = 'HOI';
			const wrongHash = await bcrypt.hash(wrongPW, 10);
			const result = await service.verifyPassword(password, wrongHash);
			expect(result).toBe(false);
		});
	});

	describe('회원가입', () => {
		const createdUser: User = {
			...dummyUser,
			id: 1,
			created_at: new Date(),
			updated_at: new Date(),
		};
		it('정상 회원 가입', async () => {
			mockUserService.createUser.mockImplementation(() => createdUser);
			const result = await service.signUp(dummyUser);
			expect(result).toBe(createdUser);
		});

		it('createUser에 넘겨져야 할 비밀번호는 해쉬 되어야 한다.', async () => {
			mockUserService.createUser.mockImplementation(() => createdUser);
			const result = await service.signUp(dummyUser);
			const { email, username, password } = mockUserService.createUser.mock.calls[0][0];

			expect(email).toEqual(dummyUser.email);
			expect(username).toEqual(dummyUser.username);
			expect(password).not.toEqual(dummyUser.password);
		});

		it('createUser에 넘겨져진 해쉬 비밀번호는 정상적으로 verify 되어야 한다.', async () => {
			mockUserService.createUser.mockImplementation(() => createdUser);
			const result = await service.signUp(dummyUser);
			const { email, username, password } = mockUserService.createUser.mock.calls[0][0];

			expect(password).not.toEqual(dummyUser.password);
			const verifyResult = await service.verifyPassword(dummyUser.password, password);
			expect(verifyResult).toBe(true);
		});
	});

	describe('유저 인증 테스트', () => {
		it('validateUser - 인증 성공 테스트', async () => {
			const hashedPassword = await bcrypt.hash(dummyUser.password, 10);
			const foundUser: User = {
				...dummyUser,
				id: 1,
				password: hashedPassword,
				created_at: new Date(),
				updated_at: new Date(),
			};
			mockUserService.getUserByEmail.mockImplementation(() => foundUser);
			const result = await service.validateUser(dummyUser.email, dummyUser.password);
			// 리턴 값에 password는 없어야 한다.
			expect(result.password).toBeUndefined();
			expect(result.email).toEqual(foundUser.email);
			expect(result.created_at).toEqual(foundUser.created_at);
			expect(result.username).toEqual(foundUser.username);
			expect(result.updated_at).toEqual(foundUser.updated_at);
		});

		it('validateUser - 비밀번호 불일치', async () => {
			const hashedPassword = await bcrypt.hash(dummyUser.password, 10);
			const foundUser: User = {
				...dummyUser,
				id: 1,
				password: hashedPassword,
				created_at: new Date(),
				updated_at: new Date(),
			};
			const wrongPassword = 'WRONGHABITSPW';
			mockUserService.getUserByEmail.mockImplementation(() => foundUser);

			// 익셉션 catch를 위해 테스트가 필요한 함수를 래핑함
			await expect(async () => {
				await service.validateUser(dummyUser.email, wrongPassword);
			}).rejects.toThrow('로그인 인증에 실패 하였습니다.');

			await expect(async () => {
				await service.validateUser(dummyUser.email, wrongPassword);
			}).rejects.toThrow(UnauthorizedException);
		});

		it('validateUser - 유저 조회 실패', async () => {
			mockUserService.getUserByEmail.mockImplementation(() => null);
			await expect(async () => {
				await service.validateUser(dummyUser.email, dummyUser.password);
			}).rejects.toThrow(UnauthorizedException);

			await expect(async () => {
				await service.validateUser(dummyUser.email, dummyUser.password);
			}).rejects.toThrow('로그인 인증에 실패 하였습니다.');
		});
	});

	//TODO
	// describe('로그인 테스트', () => {
	// 	it('토큰 및 쿠키 옵션 정상 발급', async () => {
	// 		const foundUser: User = {
	// 			...dummyUser,
	// 			id: 1,
	// 			password: 'password',
	// 			created_at: new Date(),
	// 			updated_at: new Date(),
	// 		};
	// 		const result = await service.signIn(foundUser);
	// 		console.log('result is ---> ', result);
	// 		expect(result.access_token).toBeDefined();
	// 	});
	// });
});
