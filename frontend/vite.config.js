import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Prompt for update or auto update
      injectRegister: 'auto', // or 'script' or null
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'], // Precache these assets
        runtimeCaching: [ // Example: Cache API calls (adjust as needed)
          {
            urlPattern: /^https:\/\/api\.batistock\.com\/.*/i, // Replace with your actual API base URL pattern
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'BatiStock',
        short_name: 'BatiStock',
        description: 'Simple Inventory & Sales for African Construction Traders',
        theme_color: '#4f46e5', // Indigo, adjust to your primary theme color
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png', // Path relative to public directory
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Maskable icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  // If you need to proxy API requests during development (when backend is separate)
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000', // Your backend server address
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '') // if your backend doesn't expect /api prefix
  //     }
  //   }
  // }
})
