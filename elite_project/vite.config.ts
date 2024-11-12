import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /api to Django backend
      '/api': {
        target: 'http://api.elitemediahouses.com/',
        changeOrigin: true,
        
      }
    }
  }
});
