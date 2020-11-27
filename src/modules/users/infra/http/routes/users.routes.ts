import { Router } from 'express';
import multer from 'multer';
import ensureAutheticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();

  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user: UserWithoutPassword = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
