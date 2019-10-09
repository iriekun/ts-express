import { Router } from 'express';
import { Genre, joiSchema } from './../model/genre';
import { getAll, create, update, remove, getById } from '../controller/crud';

const router = Router();

// /api/genre
router
  .route('/')
  .get(getAll(Genre))
  .post(create(Genre, joiSchema));

// /api/genre/:id
router
  .route('/:id')
  .get(getById(Genre))
  .put(update(Genre, joiSchema))
  .delete(remove(Genre));

export default router;
