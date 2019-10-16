import { Router } from 'express';
import { Customer, joiSchema } from '../model/customer';
import { getAll, create, update, remove, getById } from '../controller/crud';
import auth from './../middleware/auth';

const router = Router();
router.use('/', auth);

// /api/genre
router
  .route('/')
  .get(getAll(Customer))
  .post(create(Customer, joiSchema));

// /api/genre/:id
router
  .route('/:id')
  .get(getById(Customer))
  .put(update(Customer, joiSchema))
  .delete(remove(Customer));

export default router;
