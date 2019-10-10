import { Request, Response } from 'express';
import Joi from 'joi';
import { Genre } from './../model/genre';

export const create = (model: any, schema: any) => async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await model.find({}).select('title -_id');
    if (movie)
      return res.status(400).send('This movie title is already exsit!');

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre!');

    let doc = new model({
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: genre
    });
    doc = await doc.save();

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// prettier-ignore
const validate = (model: any, joiSchema: Joi.Schema): Joi.ValidationResult<any> => {
    return Joi.validate(model, joiSchema);
  };
