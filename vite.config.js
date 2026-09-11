import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nuance: resolve(__dirname, 'case-study/nuance/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
