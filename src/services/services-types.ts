import { ObjectId } from 'mongoose';
import { IDataBaseObjectId } from '../models/models-types';
import { IUserSchema } from '../models/user-model';

export namespace UserServiceTypes {
  interface AuthStatus {
    status: boolean;
    accessToken: string;
  }

  interface UserObject {
    _id: IDataBaseObjectId;
    email: string;
    name: string;
    about: string;
    avatar: string;
  }

  export interface CreateUserProps {
    email: string;
    password: string;
    name: string;
    about: string;
    avatar: string;
  }

  export interface LoginProps {
    email: string;
    password: string;
  }

  export type CreateUserReturn = Promise<UserObject>;

  export type LoginReturn = Promise<AuthStatus>;

  export type GetUsersReturn = Promise<UserObject[]>;

  export interface FindUserByIdProps {
    userId: string;
  }

  export type FindUserByIdReturn = Promise<UserObject>;

  export interface GetOwnDataProps {
    userId: string;
  }

  export type GetOwnDataReturn = Promise<UserObject>;

  export interface ChangeOwnDataProps {
    userId: string;
    name: string;
    about: string;
  }

  export type ChangeOwnDataReturn = Promise<UserObject>;

  export interface ChangeAvatarProps {
    userId: string;
    avatar: string;
  }

  export type ChangeAvatarReturn = Promise<UserObject>;
}

export namespace CardServiceTypes {
  interface CardObject {
    _id: IDataBaseObjectId;
    name: string;
    link: string;
    owner: ObjectId;
    createdAt: Date;
    likes: ObjectId[];
  }

  export interface PostCardProps {
    ownerId: string;
    name: string;
    link: string;
  }

  export type PostCardReturn = Promise<CardObject>;

  export interface DeleteCardProps {
    cardId: string;
    userId: string;
  }

  interface PopulatedCardObject {
    _id: IDataBaseObjectId;
    name: string;
    link: string;
    owner: IUserSchema;
    createdAt: Date;
    likes: IUserSchema[];
  }

  export type DeleteCardReturn = Promise<PopulatedCardObject>;

  export type GetCardsReturn = Promise<CardObject[]>;

  export interface LikeCardProps {
    cardId: string;
    userId: string;
  }

  export type LikeCardReturn = Promise<CardObject>;

  export interface DislikeCardProps {
    cardId: string;
    userId: string;
  }

  export type DislikeCardReturn = Promise<CardObject>;
}
