import { Request, Response } from 'express';
import { validateInput } from './../util/validation';
import { Rental, joiSchema } from './../model/rental';
import { Movie } from './../model/movie';
import { Customer } from './../model/customer';

export const getAll = () => async (req: Request, res: Response) => {
  try {
    const doc = await Rental.find().sort('-dateOut'); //sort by date in descending order
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const create = () => async (req: Request, res: Response) => {
  try {
    const { error } = validateInput(req.body, joiSchema);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie!');

    let doc = new Rental({
      customer: {
        _id: customer._id,
        name: customer.get('name'),
        phone: customer.get('phone')
      },
      movie: {
        _id: customer._id,
        dailyRentalRate: movie.get('dailyRentalRate'),
        title: movie.get('title')
      }
    });
    doc = await doc.save();

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
