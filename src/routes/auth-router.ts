import express from 'express';
import usersController from '../controllers/users-controller';

const authRouter = express.Router();

authRouter.post('/signin', usersController.login);
authRouter.post('/signup', usersController.createUser);

export default authRouter;
