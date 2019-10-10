import Joi from 'joi';
import mongoose, { Mongoose } from 'mongoose';

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

export const Genre = mongoose.model('Genre', genreSchema);

interface JoiSchema {
  name: Joi.StringSchema;
}

export const joiSchema: JoiSchema = {
  name: Joi.string()
    .min(3)
    .required()
};
