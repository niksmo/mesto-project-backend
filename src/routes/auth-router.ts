import express from 'express';
import usersController from '../controllers/users-controller';
import validationMiddleware from '../middlewares/validation-middleware';

const authRouter = express.Router();

authRouter.post(
  '/signin',
  validationMiddleware.signinBody,
  usersController.login
);
authRouter.post(
  '/signup',
  validationMiddleware.signupBody,
  usersController.createUser
);

export default authRouter;
