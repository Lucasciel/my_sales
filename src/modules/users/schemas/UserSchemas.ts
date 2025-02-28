//Validar os dados de entrada da requisição antes de chegar no controller

import {celebrate, Joi, Segments} from 'celebrate';

export const createUserSchemaValidation = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
});
