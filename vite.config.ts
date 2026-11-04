import fs from 'node:fs'
import path from 'node:path'
import { somedaytundraTheme } from '@somedaytundra/theme/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Alias } from 'vite'

// The dev server uses a sibling checkout of the theme, when there is one, so theme edits show up
// without tagging a release; builds (and `ST_THEME_SOURCE=github npm run dev`) use the tagged
// GitHub release in package.json. Keep these in step with the package's `exports`.
const LOCAL_THEME = path.resolve(import.meta.dirname, '../somedaytundra_theme')
const LOCAL_THEME_ALIASES: Alias[] = [
  { find: /^@somedaytundra\/theme$/, replacement: `${LOCAL_THEME}/dist/index.js` },
  { find: /^@somedaytundra\/theme\/clerk$/, replacement: `${LOCAL_THEME}/dist/clerk.js` },
  { find: /^@somedaytundra\/theme\/theme\.css$/, replacement: `${LOCAL_THEME}/css/theme.css` },
]

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const useLocalTheme =
    command === 'serve' &&
    process.env.ST_THEME_SOURCE !== 'github' &&
    fs.existsSync(path.join(LOCAL_THEME, 'dist/index.js'))
  if (useLocalTheme) console.log(`  using the local theme at ${LOCAL_THEME}`)

  return {
    plugins: [react(), tailwindcss(), somedaytundraTheme()],
    server: {
      // the NHL Stats client holds 5173 (strictly), and Bulldog Shuttle takes the next free port,
      // so the dashboard pins its own and fails loudly rather than drifting onto theirs
      port: 5180,
      strictPort: true,
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
        ...(useLocalTheme ? LOCAL_THEME_ALIASES : []),
      ],
      // the local theme checkout has its own dev copies of these; one shared copy keeps React's
      // hooks and Clerk's context working across the two
      dedupe: ['react', 'react-dom', '@clerk/react'],
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
  }
})
