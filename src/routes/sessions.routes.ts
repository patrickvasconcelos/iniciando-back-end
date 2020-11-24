import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userWithoutPassword = user as UserWithoutPassword;

  delete userWithoutPassword.password;

  return response.json({ user: userWithoutPassword, token });
});

export default sessionsRouter;
