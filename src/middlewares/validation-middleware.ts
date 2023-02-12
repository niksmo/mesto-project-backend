import { celebrate, Joi } from 'celebrate';

interface SigninSchema {
  email: string;
  password: string;
}

const signinBody = celebrate({
  body: Joi.object<SigninSchema>({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  }),
});

interface SignupSchema {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

const signupBody = celebrate({
  body: Joi.object<SignupSchema>({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
  }),
});

interface UpdateUserDataSchema {
  name: string;
  about: string;
}

const updateUserDataBody = celebrate({
  body: Joi.object<UpdateUserDataSchema>({
    name: Joi.string().min(2).max(30).required().trim(),
    about: Joi.string().min(2).max(200).required().trim(),
  }),
});

interface UpdateAvatarSchema {
  avatar: string;
}

const updateAvatarBody = celebrate({
  body: Joi.object<UpdateAvatarSchema>({
    avatar: Joi.string().required(),
  }),
});

export default { signinBody, signupBody, updateUserDataBody, updateAvatarBody };
