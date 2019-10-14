import { Request, Response } from 'express';
import { validateInput } from './../util/validation';
import { Rental, joiSchema } from './../model/rental';
import { Movie } from './../model/movie';
import { Customer } from './../model/customer';
import { startSession } from 'mongoose';

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
  const { error } = validateInput(req.body, joiSchema);
  if (error) return res.status(400).send(error.details[0].message);

  // use mongodb session to achieve atomicity/transaction
  const session = await startSession();
  session.startTransaction();

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    // always pass session to find queries when the data is needed for the transaction session
    const movie = await Movie.findById(req.body.movieId).session(session);
    if (!movie) return res.status(400).send('Invalid movie!');

    if (movie.numberInStock == 0)
      return res.status(400).send('Movie is not in stock!');

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        _id: customer._id,
        dailyRentalRate: movie.dailyRentalRate,
        title: movie.title
      }
    });
    await rental.save();
    movie.numberInStock--;
    await movie.save();
    await session.commitTransaction();

    res.status(200).json({ data: rental });
  } catch (error) {
    await session.abortTransaction(); //roll back all operations in the transaction
    console.error(error);
    res.status(400).end();
  } finally {
    session.endSession();
  }
};
