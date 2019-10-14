import Joi from 'joi';
import { model, models, Schema } from 'mongoose';

export const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

export const Genre = models.Genre || model('Genre', genreSchema);

interface JoiSchema {
  name: Joi.StringSchema;
}

export const joiSchema: JoiSchema = {
  name: Joi.string()
    .min(3)
    .required()
};
