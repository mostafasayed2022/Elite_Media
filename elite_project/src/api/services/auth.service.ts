import apiClient, { cookieRequest, publicClient, refreshAccessToken, waitForRefresh } from '../client';
import { setAccessToken } from '../auth-session';

export interface LoginData { username: string; password: string }
export interface RegisterData extends LoginData { email: string }
export interface AuthUser { id: number; username: string; is_staff: boolean }
export interface AuthResponse { access: string; user: AuthUser }

export const authService = {
  login: async (data: LoginData): Promise<AuthUser> => {
    await waitForRefresh();
    const response = await cookieRequest<AuthResponse>('/api/token/', data);
    setAccessToken(response.access);
    return response.user;
  },
  register: async (data: RegisterData): Promise<Omit<RegisterData, 'password'>> => {
    const response = await publicClient.post<Omit<RegisterData, 'password'>>('/api/register/', data);
    return response.data;
  },
  currentUser: async (): Promise<AuthUser> => (await apiClient.get<AuthUser>('/api/me/')).data,
  restore: async (): Promise<AuthUser> => { await refreshAccessToken(); return authService.currentUser(); },
  logout: async (): Promise<void> => { await cookieRequest('/api/logout/'); setAccessToken(null); },
};
