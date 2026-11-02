import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
	throw new Error('Falta configurar VITE_API_URL');
}

const apiClient = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' }
});

const classifyError = (error) => {
	if (!error.response) {
		return { kind: 'NETWORK', status: null, original: error };
	}
	const { status, data } = error.response;
	const kinds = { 401: 'UNAUTHORIZED', 422: 'VALIDATION' };
	return {
		kind: kinds[status] || (status >= 500 ? 'SERVER' : 'UNKNOWN'),
		status,
		data,
		original: error
	};
};

apiClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(classifyError(error))
);

export default apiClient;
