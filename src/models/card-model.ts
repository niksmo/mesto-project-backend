import { Schema, model } from 'mongoose';
import { RelatedCardSchemaKeys } from './models-types';

interface ICardSchema {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICardSchema>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    [RelatedCardSchemaKeys.owner]: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    [RelatedCardSchemaKeys.likes]: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default model('card', cardSchema);
