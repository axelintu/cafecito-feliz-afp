import apiClient from './apiClient.js';

const getProducts = async (q = '') => {
	const { data } = await apiClient.get('/products', { params: { q } });
	return data;
};

export { getProducts };
