import {celebrate, Joi, Segments} from 'celebrate';

export const UpdateUserSchemas = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    old_password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  }})
