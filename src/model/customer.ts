import mongoose from 'mongoose';
import Joi from 'joi';

export const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

interface JoiSchema {
  name: Joi.StringSchema;
  isGold: Joi.BooleanSchema;
  phone: Joi.StringSchema;
}

//prettier-ignore
export const joiSchema: JoiSchema = {
  name: Joi.string().min(3).required(),
  isGold: Joi.boolean(),
  phone: Joi.string().min(3).required()
};
