import apiClient from '../client';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const { data: response } = await apiClient.post<AuthResponse>('/api/token/', data);
    return response;
  },

  register: async (data: RegisterData): Promise<any> => {
    const { data: response } = await apiClient.post('/register/', data);
    return response;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
