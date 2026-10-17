import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const INVALID_CREDENTIALS = {
	error: 'Invalid credentials',
	message: 'Email or password is incorrect'
};

const generateToken = (userId, firstName, lastName, role) => {
	return jwt.sign(
		{ userId, firstName, lastName, role },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
	);
};

const checkUserExist = async (email) => {
	const user = await User.findOne({ email }).select('+password');
	return user;
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const userExist = await checkUserExist(email);
		if (!userExist) {
			return res
				.status(401)
				.json(INVALID_CREDENTIALS);
		}
		const isMatch = await bcrypt.compare(password, userExist.password);
		if (!isMatch) {
			return res
				.status(401)
				.json(INVALID_CREDENTIALS);
		}

		const token = generateToken(
			userExist.id,
			userExist.firstName,
			userExist.lastName,
			userExist.role
		);
		res.status(200).json({ token });
	} catch (err) {
		next(err);
	}
};

export { login };
