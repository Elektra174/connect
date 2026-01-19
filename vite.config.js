import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Корневая директория проекта
  publicDir: 'public', // Статика из /public
  build: {
    outDir: 'dist', // Сборка в /dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './public/index.html',
      },
    },
  },
  server: {
    port: 5173,
  },
});
