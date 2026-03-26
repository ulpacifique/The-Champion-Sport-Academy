import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // or use process.env.NODE_ENV === 'production' ? 'https://thechampions250.com' : '/' if you need subpath
  build: {
    outDir: 'build', // match CRA output so gh-pages deploy script keeps working
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'react-vendor';
          }
          if (id.includes('react-router')) return 'router';
          if (id.includes('@mantine')) return 'mantine';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('@tabler/icons')) return 'tabler-icons';
          if (id.includes('@reduxjs') || id.includes('/redux')) return 'redux';
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    open: true,
  },
});
