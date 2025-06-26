// import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {

  },
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      preserveEntrySignatures: 'strict',
      output: {
        format: 'system',
        entryFileNames: 'js/app.js',
      },
    },
  },
  base: '',
  server: {
    origin:'http://localhost:1111',
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: '/src'
        }
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // ✅ makes '@' work everywhere
    }
  }
});
