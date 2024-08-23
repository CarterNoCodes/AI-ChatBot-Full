import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ai-chat-bot-full.vercel.app/',
        changeOrigin: true,
      },
    }
  }
})