import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  // root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  }, 
}