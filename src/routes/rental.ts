import { Router } from 'express';
import { getAll, create } from '../controller/rental';
import { getById } from '../controller/crud';
import { Rental } from '../model/rental';

const router = Router();

// /api/genre
router
  .route('/')
  .get(getAll())
  .post(create());

router.route('/:id').get(getById(Rental));

export default router;
