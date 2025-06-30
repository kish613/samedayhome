import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Development server configuration for Vercel API routes
  server: {
    // For development, we'll install and use Vercel CLI or update the frontend to handle fallback
    middlewareMode: false
  }
})
