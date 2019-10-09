import Joi from 'joi';
import mongoose from 'mongoose';

export const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

interface JoiSchema {
  name: Joi.StringSchema;
}

export const joiSchema: JoiSchema = {
  name: Joi.string()
    .min(3)
    .required()
};
