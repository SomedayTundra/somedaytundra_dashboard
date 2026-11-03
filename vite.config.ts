import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    // the NHL Stats client holds 5173 (strictly), and Bulldog Shuttle takes the next free port,
    // so the dashboard pins its own and fails loudly rather than drifting onto theirs
    port: 5180,
    strictPort: true,
  },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
  },
}))
