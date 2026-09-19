import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If your existing project already has a vite.config.js, merge this
// plugin entry into it rather than replacing the file.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
