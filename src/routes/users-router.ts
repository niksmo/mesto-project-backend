import express from 'express';
import usersController from '../controllers/users-controller';
import validationMiddleware from '../middlewares/validation-middleware';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getUsers);

usersRouter.post(
  '/',
  validationMiddleware.signinBody,
  usersController.createUser
);

usersRouter.get('/me', usersController.getOwnData);

usersRouter.get('/:userId', usersController.findUserById);

usersRouter.patch(
  '/me',
  validationMiddleware.updateUserDataBody,
  usersController.changeOwnData
);

usersRouter.patch(
  '/me/avatar',
  validationMiddleware.updateAvatarBody,
  usersController.changeAvatar
);

export default usersRouter;
