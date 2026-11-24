import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy: requisições para /api/* são encaminhadas ao Flask (porta 5000),
// evitando problemas de CORS durante o desenvolvimento.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
