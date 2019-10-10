import Joi from 'joi';
import mongoose from 'mongoose';
import { genreSchema } from './genre';

export const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    numberInStock: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 255
    },
    genre: {
      type: genreSchema,
      required: true
    }
  })
);

interface JoiSchema {
  title: Joi.StringSchema;
  numberInStock: Joi.NumberSchema;
  dailyRentalRate: Joi.NumberSchema;
  genreId: Joi.StringSchema;
}

export const joiSchema: JoiSchema = {
  title: Joi.string()
    .min(5)
    .max(50)
    .required(),
  numberInStock: Joi.number().required(),
  dailyRentalRate: Joi.number().required(),
  genreId: Joi.string().required()
};
