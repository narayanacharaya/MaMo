import { Router } from 'express';
import {
  signup,
  login,
  signupvalidator,
  siginValidator,
} from '../controllers/userController';

const router = Router();

router.post('/signup', signupvalidator, signup);
router.post('/login', siginValidator, login);

export default router;
