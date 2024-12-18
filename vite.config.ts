import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 添加服务器代理配置
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085', // 你的后端服务地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 前缀删除
      }
    }
  }
})