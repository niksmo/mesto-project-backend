import express from 'express';
import usersController from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/users', usersController.signup);

usersRouter.get('/users', usersController.getUsers);

usersRouter.get('/users/:userId', usersController.findUserById);

usersRouter.patch('/users/me', usersController.changeOwnData);

usersRouter.patch('/users/me/avatar', usersController.changeAvatar);

export default usersRouter;
