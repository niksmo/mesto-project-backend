import mongoose from 'mongoose';
import ApiError from '../exceptions/api-error';
import UserModel from '../models/user';
import { UserServiceTypes } from './types';

async function signup(
  props: UserServiceTypes.SignupIn
): UserServiceTypes.SignupOut {
  try {
    const { name, about, avatar } = props;
    const candidate = new UserModel({ name, about, avatar });

    const user = await candidate.save();

    return user;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw ApiError.BadRequest(error.message);
    }
    throw ApiError.InternalError();
  }
}

async function getUsers(): UserServiceTypes.GetUsersOut {
  try {
    const users = await UserModel.find({});

    return users;
  } catch (error) {
    throw ApiError.InternalError();
  }
}

async function findUserById(
  props: UserServiceTypes.FindUserByIdIn
): UserServiceTypes.FindUserByIdOut {
  try {
    const { userId } = props;
    const user = await UserModel.findById(userId);

    if (user === null) {
      throw ApiError.NotFound();
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

async function changeOwnData(
  props: UserServiceTypes.ChangeOwnDataIn
): UserServiceTypes.ChangeOwnDataOut {
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
      throw ApiError.NotFound();
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw ApiError.BadRequest(error.message);
    }

    throw ApiError.InternalError();
  }
}

async function changeAvatar({
  userId,
  avatar,
}: UserServiceTypes.ChangeAvatarIn): UserServiceTypes.ChangeAvatarOut {
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
      throw ApiError.NotFound();
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      throw ApiError.BadRequest(error.message);
    }

    throw ApiError.InternalError();
  }
}

export default { signup, getUsers, findUserById, changeOwnData, changeAvatar };
