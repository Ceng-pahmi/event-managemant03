import { Router } from 'express';
import { registerUser } from '../controllers/registerController';
import { loginUser } from '../controllers/loginController';
import { body } from 'express-validator';
import { userAuthenticateToken } from '../middleware/userDataMiddleware';
import { userData } from './../controllers/userData';

const router = Router();

// User registration route
router.post(
  '/register',
  [
    body('first_name').notEmpty().withMessage('First Name is required'),
    body('last_name').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  registerUser,
);

// User login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser,
);

router.get('/user', userAuthenticateToken, userData);

export default router;
