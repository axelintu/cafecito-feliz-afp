import express from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';
import validate from '../middleware/validate.js';

const router = express.Router();

const loginValidations = [
	body('email')
		.isEmail().withMessage('A valid email is required'),
	body('password')
		.notEmpty().withMessage('Password is required')
		.bail()
		.isString().withMessage('Password must be a string')
];

router.post('/login', loginValidations, validate, login);

export default router;
