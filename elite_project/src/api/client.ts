import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.elitemediahouses.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., 401 logout)
    if (error.response?.status === 401) {
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
