import mongoose from 'mongoose';

interface IUserDtoModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  about: string;
  avatar: string;
  email: string;
}

type TUserDto = IUserDtoModel;

function getDto(model: IUserDtoModel): TUserDto {
  const { _id, name, about, avatar, email } = model;

  const userDto = { _id, name, about, avatar, email };

  return userDto;
}

export default { getDto };
