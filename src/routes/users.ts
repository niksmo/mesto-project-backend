import express from 'express';
import usersController from '../controllers/users';

const usersRouter = express.Router();

usersRouter.post('/', usersController.signup);

usersRouter.get('/', usersController.getUsers);

usersRouter.get('/:userId', usersController.findUserById);

usersRouter.patch('/me', usersController.changeOwnData);

usersRouter.patch('/me/avatar', usersController.changeAvatar);

export default usersRouter;
