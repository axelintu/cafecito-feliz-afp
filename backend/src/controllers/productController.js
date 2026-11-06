import Product from '../models/Product.js';

const getProducts = async (req, res, next) => {
	try {
		const filters = { isActive: true };
		const data = await Product.find(filters)
			.sort({ name: 1 })
			.collation({ locale: 'es' });
		const total = data?.length;
		res.status(200).json({
			data,
			total,
		});
	} catch (err) {
		next(err);
	}
};

export { getProducts };
