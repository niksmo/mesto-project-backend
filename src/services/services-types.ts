import { ObjectId } from 'mongoose';
import { IDataBaseObjectId } from '../models/models-types';

export namespace UserServiceTypes {
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

  interface AuthStatus {
    status: boolean;
    accessToken: string;
  }

  interface PreservedUserObject {
    _id: IDataBaseObjectId;
    email: string;
    name: string;
    about: string;
    avatar: string;
  }

  export type CreateUserReturn = Promise<PreservedUserObject>;

  export type LoginReturn = Promise<AuthStatus>;

  export type GetUsersReturn = Promise<PreservedUserObject[]>;

  export interface FindUserByIdProps {
    userId: string;
  }

  export type FindUserByIdReturn = Promise<PreservedUserObject>;

  export interface GetOwnDataProps {
    userId: string;
  }

  export type GetOwnDataReturn = Promise<PreservedUserObject>;

  export interface ChangeOwnDataProps {
    userId: string;
    name: string;
    about: string;
  }

  export type ChangeOwnDataReturn = Promise<PreservedUserObject>;

  export interface ChangeAvatarProps {
    userId: string;
    avatar: string;
  }

  export type ChangeAvatarReturn = Promise<PreservedUserObject>;
}

export namespace CardServiceTypes {
  export interface PostCardProps {
    ownerId: string;
    name: string;
    link: string;
  }

  interface PreservedCardObject {
    _id: IDataBaseObjectId;
    name: string;
    link: string;
    owner: ObjectId;
    createdAt: Date;
    likes: ObjectId[];
  }

  export type PostCardReturn = Promise<PreservedCardObject>;
  export type GetCardsReturn = Promise<PreservedCardObject[]>;
  export type DeleteCardReturn = Promise<PreservedCardObject>;

  export interface LikeCardProps {
    cardId: string;
    userId: string;
  }

  export type LikeCardReturn = Promise<PreservedCardObject>;

  export interface DislikeCardProps {
    cardId: string;
    userId: string;
  }

  export type DislikeCardReturn = Promise<PreservedCardObject>;
}
