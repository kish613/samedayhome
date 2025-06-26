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
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy, options) => {
          // Fallback for development - return mock data when API server isn't running
          proxy.on('error', (err, req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              success: true,
              data: {
                success: true,
                offer: {
                  market_value: 350000,
                  cash_offer: 315000,
                  discount_percentage: 10,
                  reasoning: `Mock valuation for development. Property details processed successfully.`,
                  risk_factors: ['Development mode', 'Mock data used'],
                  comparable_analysis: 'Mock comparable analysis for development'
                },
                timestamp: new Date().toISOString()
              }
            }))
          })
        }
      }
    }
  }
})
