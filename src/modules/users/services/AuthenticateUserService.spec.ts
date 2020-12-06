import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUsers: CreateUserService;
let authenticateUsers: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUsers = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    authenticateUsers = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const response = await authenticateUsers.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUsers.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUsers.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUsers.execute({
        email: 'johndoe@example.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
