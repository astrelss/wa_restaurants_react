import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Or any other base path for your backend API
        target: 'http://localhost:8001',
        changeOrigin: true, // Important for cookies and host headers
        secure: false,     // Since your backend is likely not using HTTPS in development
        // Optional: You might need to configure cookie domain rewriting in some cases
        // cookieDomainRewrite: 'localhost:5173',
      },
      // If you have other backend endpoints, you can add more proxy rules
    },
  }
})
