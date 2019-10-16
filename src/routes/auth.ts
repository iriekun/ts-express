import { Router } from 'express';
import { signup, login, getCurrentUser } from '../controller/auth';

const router = Router();

router.route('/signup').post(signup());
router.route('/login').post(login());
router.route('/me').get(getCurrentUser());

export default router;
