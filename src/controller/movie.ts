import { Request, Response } from 'express';
import { Genre } from './../model/genre';
import { validateInput } from './../util/validation';

export const create = (model: any, joiSchema: any) => async (
  req: Request,
  res: Response
) => {
  const { error } = validateInput(req.body, joiSchema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const movie = await model.find({ title: req.body.title });
    if (movie.length)
      return res.status(400).send('This movie title is already exist!');

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
