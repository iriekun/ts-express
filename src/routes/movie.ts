import { Router } from 'express';
import { Movie, joiSchema } from '../model/Movie';
import { getAll, update, remove, getById } from '../controller/crud';
import { create } from '../controller/movie';

const router = Router();

// /api/genre
router
  .route('/')
  .get(getAll(Movie))
  .post(create(Movie, joiSchema));

// /api/genre/:id
router
  .route('/:id')
  .get(getById(Movie))
  .put(update(Movie, joiSchema))
  .delete(remove(Movie));

export default router;
