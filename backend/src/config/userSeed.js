import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connectDB from './db.conf.js';
import User from '../models/User.js';

const sellerPassword = process.env.SEED_SELLER_PASSWORD;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

const users = [
	{
		firstName: 'Victor',
		lastName: 'Carmelo',
		email: 'vendedor@cafecitofeliz.com',
		role: 'Seller',
		password: sellerPassword
	}, {
		firstName: 'Armin',
		lastName: 'Feliciano',
		email: 'admin@cafecitofeliz.com',
		role: 'Admin',
		password: adminPassword
	}
];

const generatePassword = async (pass) => {
	const saltRounds = 10;
	return await bcrypt.hash(pass, saltRounds);
};

const seed = async () => {
	const neededEnvVars = [
		'SEED_SELLER_PASSWORD',
		'SEED_ADMIN_PASSWORD'
	];
	const missingEnvVars = neededEnvVars.filter(name => !process.env[name]);
	if (missingEnvVars.length) {
		console.error(
			'Faltan las siguientes variables en backend/.env\n'
			+ missingEnvVars.join('\n')
		);
		process.exitCode = 1;
		return;
	}

	await connectDB();
	try {
		const deleted = await User.deleteMany({});
		console.log(`Usuarios eliminados: ${deleted.deletedCount}`);

		let inserted = 0;
		console.log('Usuarios a insertar:');
		for (const user of users) {
			const { firstName, lastName, email, role, password } = user;
			const hashPassword = await generatePassword(password);
			const newUser = new User({
				firstName,
				lastName,
				email,
				role,
				password: hashPassword
			});
			await newUser.save();
			inserted++;
			console.log(
				`  ${firstName} ${lastName} (${role} - email: ${email})`
			);
		}
		console.log(`Usuarios insertados: ${inserted}`);

		console.log('Seed de usuarios completado');
	} catch (err) {
		console.error('Error al ejecutar el seed de usuarios', err);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
};

await seed();
