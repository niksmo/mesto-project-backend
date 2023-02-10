import { Schema, model } from 'mongoose';

export interface IUserSchema {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model('user', userSchema);
