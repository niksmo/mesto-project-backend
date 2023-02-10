import { ObjectId } from 'mongoose';
import { IDataBaseObjectId } from '../models/types';

export namespace UserServiceTypes {
  export interface SignupIn {
    name: string;
    about: string;
    avatar: string;
  }

  interface PreservedUserObject {
    _id: IDataBaseObjectId;
    name: string;
    about: string;
    avatar: string;
  }

  export type SignupOut = Promise<PreservedUserObject>;

  export type GetUsersOut = Promise<PreservedUserObject[]>;

  export interface FindUserByIdIn {
    userId: string;
  }

  export type FindUserByIdOut = Promise<PreservedUserObject>;

  export interface ChangeOwnDataIn {
    userId: string;
    name: string;
    about: string;
  }

  export type ChangeOwnDataOut = Promise<PreservedUserObject>;

  export interface ChangeAvatarIn {
    userId: string;
    avatar: string;
  }

  export type ChangeAvatarOut = Promise<PreservedUserObject>;
}

export namespace CardServiceTypes {
  export interface PostCardIn {
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

  export type PostCardOut = Promise<PreservedCardObject>;
  export type GetCardsOut = Promise<PreservedCardObject[]>;
  export type DeleteCardOut = Promise<PreservedCardObject>;

  export interface LikeCardIn {
    cardId: string;
    userId: string;
  }

  export type LikeCardOut = Promise<PreservedCardObject>;

  export interface DislikeCardIn {
    cardId: string;
    userId: string;
  }

  export type DislikeCardOut = Promise<PreservedCardObject>;
}
