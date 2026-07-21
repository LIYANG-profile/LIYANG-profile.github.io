import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'omit-local-clips-from-dist',
      closeBundle() {
        // 视频已托管到 Cloudflare R2，构建产物不需要本地 clips
        rmSync(resolve(__dirname, 'dist/clips'), {
          recursive: true,
          force: true,
        })
      },
    },
  ],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
