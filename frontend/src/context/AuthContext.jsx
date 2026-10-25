import { createContext, useContext, useState } from 'react';
import { login as loginService } from '../services/authService.js';
import {
  getToken,
  saveToken,
  clearToken,
  isTokenExpired,
  decodeToken,
} from '../utils/auth.js';

const AuthContext = createContext(null);

function userFromPayload(payload) {
  return {
    userId: payload.userId,
    firstName: payload.firstName,
    lastName: payload.lastName,
    role: payload.role
  };
}

function getInitialUser() {
  const token = getToken();
  const payload = token && !isTokenExpired(token) ? decodeToken(token) : null;
  if (!payload) {
    clearToken();
    return null;
  }
  return userFromPayload(payload);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = async (credentials) => {
    const { token } = await loginService(credentials);
    saveToken(token);

    const payload = decodeToken(token);
    if (!payload) throw new Error('Token inválido del backend');
    setUser(userFromPayload(payload));
  };

  const value = { user, isAuthenticated: !!user, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider> ');
  }
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
