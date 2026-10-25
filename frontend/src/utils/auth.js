import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'authToken';

function saveToken(token) {
	if (!token) return;
	localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
	return localStorage.getItem(TOKEN_KEY) || null;
}

function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
}

function decodeToken(token) {
	if (!token) return null;
	try {
		const payload = jwtDecode(token);
		return payload;
	} catch {
		if (import.meta.env.DEV) console.warn('Invalid token in storage');
		return null;
	}
}

function isTokenExpired(token) {
	const payload = decodeToken(token);
	if (!payload?.exp) return true;

	return Date.now() >= payload.exp * 1000;
}

export {
	TOKEN_KEY,
	saveToken,
	getToken,
	clearToken,
	decodeToken,
	isTokenExpired
};
