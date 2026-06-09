import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for Tools for Teaching
 * Dev: React at http://localhost:5174, /api proxied to Laragon at http://localhost
 * Production: built to dist/ and deployed to site root alongside api/ folder
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true
      }
    }
  },
  base: '/'
})
