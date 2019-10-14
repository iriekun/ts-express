import { Request, Response } from 'express';
import { Genre } from './../model/genre';
import { validateInput } from './../util/validation';
import { Types } from 'mongoose';

export const create = (model: any, joiSchema: any) => async (
  req: Request,
  res: Response
) => {
  const { error } = validateInput(req.body, joiSchema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    if (!Types.ObjectId.isValid(req.body.genreId))
      return res.status(400).send('Invalid genre ID');
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre!');

    const doc = new model({
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        name: genre.name
      }
    });
    await doc.save();

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
