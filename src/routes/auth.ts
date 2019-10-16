import { Router } from 'express';
import { signup, login, getCurrentUser } from '../controller/auth';
import auth from './../middleware/auth';

const router = Router();

router.use('/', auth);

router.route('/signup').post(signup());
router.route('/login').post(login());
router.route('/me').get(getCurrentUser());

export default router;
