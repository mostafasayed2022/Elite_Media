import axios from 'axios';
import { getAccessToken, setAccessToken } from './auth-session';

export const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '')).replace(/\/$/, '');
if (!API_URL) throw new Error('Set VITE_API_URL before building for production.');

export const publicClient = axios.create({ baseURL: API_URL, timeout: 15000 });
const authClient = axios.create({ baseURL: API_URL, timeout: 15000, withCredentials: true });
const apiClient = axios.create({ baseURL: API_URL, timeout: 15000 });

export async function cookieRequest<T>(path: string, data: unknown = {}): Promise<T> {
  const { data: csrf } = await authClient.get<{ csrfToken: string }>('/api/auth/csrf/');
  const response = await authClient.post<T>(path, data, { headers: { 'X-CSRFToken': csrf.csrfToken } });
  return response.data;
}

let refreshPromise: Promise<string> | null = null;
export async function waitForRefresh(): Promise<void> { await refreshPromise?.catch(() => undefined); }
export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = cookieRequest<{ access: string }>('/api/token/refresh/')
      .then(({ access }) => { setAccessToken(access); return access; })
      .catch((error: unknown) => { setAccessToken(null); throw error; })
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
apiClient.interceptors.response.use((response) => response, async (error: unknown) => {
  if (!axios.isAxiosError(error) || !error.config || error.response?.status !== 401) return Promise.reject(error);
  const config = error.config as typeof error.config & { _retried?: boolean };
  if (config._retried || config.url === '/api/me/') return Promise.reject(error);
  config._retried = true;
  try {
    const access = await refreshAccessToken();
    config.headers.Authorization = `Bearer ${access}`;
    return await apiClient.request(config);
  } catch {
    window.dispatchEvent(new Event('elite:session-ended'));
    return Promise.reject(error);
  }
});
export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'Something went wrong. Please try again.';
  if (!error.response) return 'Cannot reach the server. Check your connection and try again.';
  if (error.response.status === 429) return 'Too many attempts. Please wait before trying again.';
  if (error.response.status === 401) return 'Your session has ended. Please sign in again.';
  const data: unknown = error.response.data;
  if (data && typeof data === 'object') {
    const messages = Object.entries(data).flatMap(([key, value]) => {
      if (typeof value === 'string') return [`${key === 'detail' ? '' : `${key}: `}${value}`];
      if (Array.isArray(value)) return [`${key}: ${value.filter((item): item is string => typeof item === 'string').join(' ')}`];
      return [];
    });
    if (messages.length) return messages.join(' ');
  }
  return 'The request could not be completed. Please try again.';
}
export default apiClient;
