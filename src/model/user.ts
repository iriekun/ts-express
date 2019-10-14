import Joi from 'joi';
import { model, models, Schema } from 'mongoose';
import PasswordComplexity from 'joi-password-complexity';

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

export const User = models.User || model('User', userSchema);

export type JoiSchema = {
  name: Joi.StringSchema;
  email: Joi.StringSchema;
  password: PasswordComplexity;
};

export const joiSchema: JoiSchema = {
  name: Joi.string()
    .min(5)
    .max(50)
    .required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email(),
  password: new PasswordComplexity()
};
