import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://backend:8080', //  'http://localhost:8080' if you are running the app locally
        changeOrigin: true,
        secure: false,
      }
    }
  }
})