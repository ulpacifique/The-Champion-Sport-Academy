import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // or use process.env.NODE_ENV === 'production' ? 'https://thechampions250.com' : '/' if you need subpath
  build: {
    outDir: 'build', // match CRA output so gh-pages deploy script keeps working
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
