import Product from '../models/Product.js';
import { buildSearchRegex } from '../utils/searchRegex.js';

const getProducts = async (req, res, next) => {
	try {
		const filters = { isActive: true };
		const {
			q = '',
		} = req.query;
		const searchTerm = typeof q === 'string'
			? q.trim()
			: '';
		if (searchTerm.length !== 0) {
			filters.name = buildSearchRegex(searchTerm);
		}

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
