import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';
import UserDto from '../dtos/user-dto';
import tokenService from './token-service';
import { UserServiceTypes } from './services-types';
import {
  BadRequestError,
  ConflictError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '../exceptions/api-error';

async function createUser(
  props: UserServiceTypes.CreateUserProps
): UserServiceTypes.CreateUserReturn {
  try {
    const { name, about, avatar, email, password } = props;

    const hashPassword = await bcrypt.hash(password, 10);

    const preservedUser = await UserModel.create({
      email,
      password: hashPassword,
      name,
      about,
      avatar,
    });

    return UserDto.getDto(preservedUser);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      throw new ConflictError('User already exist');
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(error.message);
    }
    throw new InternalError();
  }
}

async function login(
  props: UserServiceTypes.LoginProps
): UserServiceTypes.LoginReturn {
  const { email, password } = props;

  const user = await UserModel.findOne({ email }, { password: 1 });

  if (user === null) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  const isPwdEqual = await bcrypt.compare(password, user.password);

  if (!isPwdEqual) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  const { accessToken } = tokenService.generateToken(user.id);
  return { status: true, accessToken };
}

async function getUsers(): UserServiceTypes.GetUsersReturn {
  try {
    const users = await UserModel.find({});

    return users;
  } catch (error) {
    throw new InternalError();
  }
}

async function findUserById(
  props: UserServiceTypes.FindUserByIdProps
): UserServiceTypes.FindUserByIdReturn {
  try {
    const { userId } = props;
    const user = await UserModel.findById(userId);

    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw new BadRequestError('incorrect id template');
    }

    throw new InternalError();
  }
}

async function getOwnData(
  props: UserServiceTypes.GetOwnDataProps
): UserServiceTypes.GetOwnDataReturn {
  try {
    const { userId } = props;

    const user = await UserModel.findById(userId);

    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(error.message);
    }

    throw new InternalError();
  }
}

async function changeOwnData(
  props: UserServiceTypes.ChangeOwnDataProps
): UserServiceTypes.ChangeOwnDataReturn {
  try {
    const { userId, name, about } = props;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    );

    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(error.message);
    }

    throw new InternalError();
  }
}

async function changeAvatar({
  userId,
  avatar,
}: UserServiceTypes.ChangeAvatarProps): UserServiceTypes.ChangeAvatarReturn {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    if (user === null) {
      throw new NotFoundError();
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestError(error.message);
    }

    throw new InternalError();
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
