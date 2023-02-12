import { IUserSchema } from '../models/user-model';

type TUserDocument = IUserSchema;

interface IUserDtoModel {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
}

function getDto(model: TUserDocument): IUserDtoModel {
  const { _id, name, about, avatar, email } = model;

  const userDto = { _id: String(_id), name, about, avatar, email };

  return userDto;
}

export default { getDto };
