import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './db.conf.js';
import Product from '../models/Product.js';

const products = [
	{ name: 'Café Americano', price: 40, stock: 6, isActive: true },
	{ name: 'Café Latte', price: 45, stock: 20, isActive: true },
	{ name: 'Té Verde', price: 35, stock: 12, isActive: true },
	{ name: 'Capuchino', price: 50, stock: 0, isActive: true },
	{ name: 'Frappé de Vainilla', price: 55, stock: 8, isActive: false },
];

const seed = async () => {
	await connectDB();

	try {
		const deleted = await Product.deleteMany({});
		console.log(`Productos eliminados: ${deleted.deletedCount}`);

		const inserted = await Product.insertMany(products);
		console.log(`Productos insertados: ${inserted.length}`);
		for (const p of inserted) {
			const status = p.isActive ? '' : ' — inactivo';
			console.log(
				`  ${p.name} — $${p.price} — stock ${p.stock}${status}`
			);
		}

		console.log('Seed completado.');
	} catch (err) {
		console.error('Error al ejecutar el seed', err);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
};

await seed();
