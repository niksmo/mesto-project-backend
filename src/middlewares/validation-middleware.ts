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
    avatar: Joi.string().uri({
      scheme: /https?/,
      domain: { allowFullyQualified: true },
    }),
  }),
});

interface GetUserByIdParamsSchema {
  userId: string;
}

const getUserById = celebrate({
  params: Joi.object<GetUserByIdParamsSchema>({
    userId: Joi.string().alphanum().length(24).required(),
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
    avatar: Joi.string()
      .uri({
        scheme: /https?/,
        domain: { allowFullyQualified: true },
      })
      .required(),
  }),
});

interface PostCard {
  name: string;
  link: string;
}

const postCardBody = celebrate({
  body: Joi.object<PostCard>({
    name: Joi.string().min(2).max(30).required().trim(),
    link: Joi.string()
      .uri({
        scheme: /https?/,
        domain: { allowFullyQualified: true },
      })
      .required(),
  }),
});

interface CardIdParamsSchema {
  cardId: string;
}

const cardIdParams = celebrate({
  params: Joi.object<CardIdParamsSchema>({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
});

export default {
  signinBody,
  signupBody,
  updateUserDataBody,
  updateAvatarBody,
  postCardBody,
  getUserById,
  cardIdParams,
};
