import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
        globPatterns: ['**/*.{js,css,html,png,svg,json}']
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
