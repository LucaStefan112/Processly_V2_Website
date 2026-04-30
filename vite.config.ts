import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE when deploying under a GitHub Pages subpath:
//   VITE_BASE=/Processly_V2_Website/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
  },
})
