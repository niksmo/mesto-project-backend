import { Schema, model, Document } from 'mongoose';

export interface IUserSchema extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
      trim: true,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 200,
      trim: true,
    },
    avatar: {
      type: String,
      // validate: {
      //   validator(uri: string) {
      //     return /\d{3}-\d{3}-\d{4}/.test(v);
      //   },
      //   message(props) {
      //     debugger;
      //     return `${props.value} is ... some text!`;
      //   },
      // },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  { versionKey: false }
);

export default model('user', userSchema);
