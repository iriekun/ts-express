import { Router } from 'express';
import { Genre, joiSchema } from './../model/genre';
import { getAll, create, update, remove, getById } from '../controller/crud';
import auth from './../middleware/auth';
import isAdmin from './../middleware/admin';

const router = Router();
router.use('/', auth);

// /api/genre
router
  .route('/')
  .get(getAll(Genre))
  .post(create(Genre, joiSchema));

// /api/genre/:id
router
  .route('/:id')
  .get(getById(Genre))
  .put(update(Genre, joiSchema));

router.delete('/:id', isAdmin, remove(Genre)); //role based authorization

export default router;
