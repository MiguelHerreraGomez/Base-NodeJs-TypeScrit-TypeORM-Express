import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const validator = createValidator({ passError: true });

export const index = validator.body(
  Joi.object({
    usuario_id: Joi.string().required(),
  })
);
