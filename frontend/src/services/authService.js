import apiClient from './apiClient.js';

const login = async (credentials) => {
	const { email, password } = credentials;
	const payload = {
		email: email?.trim().toLowerCase(),
		password
	};
	const { data } = await apiClient.post('/auth/login', payload);
	return data;
};

export { login };
