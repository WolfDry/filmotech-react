import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { generateSW } from 'workbox-build';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,png,svg,json}'],
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: "PWA",
        description : "Appli progressive web app",
        short_name : "PWA",
        start_url : "/",
        display : "standalone",
        background_color : "#FFF",
        theme_color : "#3f51b5",
        icons : [
            {
                src : "/icon.png",
                sizes : "144x144",
                type : "image/png"
            }
        ]
      }
    })
  ],
})

// Plugin Workbox pour Vite
const workboxPlugin = () => ({
  name: 'workbox-plugin',
  closeBundle: async () => {
    await generateSW({
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,css,png,jpg}'],
      swDest: 'dist/sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://filmotech-react.vercel.app/',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 24 * 60 * 60, // 1 jour
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    });
  },
});
