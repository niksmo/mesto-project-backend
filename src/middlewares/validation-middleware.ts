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

export default { signinBody, signupBody };
