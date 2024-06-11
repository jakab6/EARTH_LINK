import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), cesium()],
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  server: {
    port: 5173,
  }
});
