import { Router } from 'express';
import { getAll, create } from '../controller/rental';

const router = Router();

// /api/genre
router
  .route('/')
  .get(getAll())
  .post(create());

export default router;
