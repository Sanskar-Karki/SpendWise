import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configure alias for "@/src"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Use "@" to refer to "src" folder
    },
  },
});
