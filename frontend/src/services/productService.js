import apiClient from './apiClient.js';

const getProducts = async () => {
	const { data } = await apiClient.get('/products');
	return data;
};

export { getProducts };
