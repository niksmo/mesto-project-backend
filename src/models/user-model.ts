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
      validate: {
        validator(url: string) {
          // eslint-disable-next-line no-useless-escape
          return /https?:\/\/((www\.[-\w@:%\.\+~#=]{1,256}\.)|([-0-9a-vx-z@:%\.\+~#=]{1,256}\.))[a-z0-9()]{2,6}\b([-\w()@:%\.\+~#=/?&]*)/i.test(
            url
          );
        },
        message(props) {
          return `"${props.value}" not correspond to correct url address`;
        },
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      trim: true,
    },
  },
  { versionKey: false }
);

export default model('user', userSchema);
