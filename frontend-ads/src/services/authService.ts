import api from './api';
import type { AuthResponse, LoginRequest, RegistroRequest } from '../types/auth.types';

export const authService = {
  registro: async (data: RegistroRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/registro', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
    }
  },
};
