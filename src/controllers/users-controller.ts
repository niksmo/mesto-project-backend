import { NextFunction, Request, Response } from 'express';
import userService from '../services/user-service';
import ApiError from '../exceptions/api-error';
import { isReqWithUser } from '../middlewares/auth-middleware';

interface ICreateUserReqBody {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

async function createUser(
  req: Request<unknown, unknown, ICreateUserReqBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, about, avatar, email, password } = req.body;

    const resBody = await userService.createUser({
      name,
      about,
      avatar,
      email,
      password,
    });

    res.send(resBody);
  } catch (error) {
    next(error);
  }
}

interface ILoginReqBody {
  email: string;
  password: string;
}

async function login(
  req: Request<unknown, unknown, ILoginReqBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const { accessToken, status } = await userService.login({
      email,
      password,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: true,
    });
    res.send({ status });
  } catch (error) {
    next(error);
  }
}

async function getUsers(
  req: Request<unknown, unknown, undefined>,
  res: Response,
  next: NextFunction
) {
  try {
    const resBody = await userService.getUsers();

    res.send(resBody);
  } catch (error) {
    next(error);
  }
}

interface IUserIdParams extends Request {
  userId: string;
}

async function findUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = (req as unknown as Request<IUserIdParams>).params;

    const user = await userService.findUserById({ userId });

    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function getOwnData(req: Request, res: Response, next: NextFunction) {
  if (isReqWithUser(req)) {
    try {
      const { _id: userId } = req.user;

      const userData = await userService.getOwnData({
        userId,
      });

      res.send(userData);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

interface IChangeOwnDataReqBody {
  name: string;
  about: string;
}

async function changeOwnData(
  req: Request<any, unknown, IChangeOwnDataReqBody>,
  res: Response,
  next: NextFunction
) {
  if (isReqWithUser<IChangeOwnDataReqBody>(req)) {
    try {
      const { _id: userId } = req.user;

      const { name, about } = req.body;

      const newUserData = await userService.changeOwnData({
        userId,
        name,
        about,
      });

      res.send(newUserData);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

interface IChangeAvatarReqBody {
  avatar: string;
}

async function changeAvatar(
  req: Request<any, unknown, IChangeAvatarReqBody>,
  res: Response,
  next: NextFunction
) {
  if (isReqWithUser<IChangeAvatarReqBody>(req)) {
    try {
      const { _id: userId } = req.user;

      const { avatar } = req.body;

      const newUserData = await userService.changeAvatar({
        userId,
        avatar,
      });

      res.send(newUserData);
    } catch (error) {
      next(error);
    }
  } else {
    next(ApiError.Unauthorized());
  }
}

export default {
  createUser,
  login,
  getUsers,
  findUserById,
  getOwnData,
  changeOwnData,
  changeAvatar,
};
