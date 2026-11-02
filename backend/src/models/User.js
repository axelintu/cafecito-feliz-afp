import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		role: {
			type: String,
			enum: ['Seller', 'Admin'],
			required: true,
			default: 'Seller'
		},
	}
);

const User = mongoose.model('User', userSchema);

export default User;
