# SomedayTundra Dashboard

The SomedayTundra home page: a sidebar dashboard that links out to the other projects, in two
themes: **Glacier Forest** (light: snow, ice and a snowy tree line) and **Aurora** (dark:
northern-lights ribbons over a night sky).

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, TanStack Router and TanStack Query, plus
Clerk for sign-in.

## Run it

```sh
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:5180
```

The themes come from [`@somedaytundra/theme`](https://github.com/SomedayTundra/somedaytundra_theme).
`package.json` pins a tagged GitHub release, and builds always use it. The dev server instead
uses a sibling checkout at `../somedaytundra_theme` when one exists and has been built, so theme
edits show up without tagging a release. It prints "using the local theme" when it does.
TypeScript follows the same rule via `paths` in `tsconfig.app.json`.

- Working on the theme: run `npm run dev` in `../somedaytundra_theme` too. It rebuilds on save,
  and the dashboard reloads with the change.
- Trying the published release in dev: `ST_THEME_SOURCE=github npm run dev` (in PowerShell,
  `$env:ST_THEME_SOURCE='github'; npm run dev`).
- Releasing a theme change: tag it in the theme repo, then bump the `#vX.Y.Z` in this
  `package.json` and run `npm install`.

| Variable | What it's for |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk's `pk_test_…`/`pk_live_…` key. Unset, the app runs signed-out only. |
| `VITE_NHL_STATS_URL` | Where the sidebar's NHL Stats link opens. Defaults to `http://localhost:5173`. |
| `VITE_BULLDOG_SHUTTLE_URL` | Where Bulldog Shuttle opens. Defaults to `http://localhost:5174`. |

The dev server pins port 5180 (`strictPort`) so it can run alongside NHL Stats (5173) and
Bulldog Shuttle (the next free port, 5174 when NHL Stats is up).

## Layout

- `src/router.tsx`: every route. `AppLayout` is the root: the fixed theme backdrop, the sidebar,
  and a bounded, scrollable `<main>` the pages render into.
- Pages: `/` Home, `/blog`, `/projects/dev-blog`, `/settings`, `/help`. Blog, Dev Blog and Help
  are full-height placeholders (`PlaceholderPage.tsx`). NHL Stats and Bulldog Shuttle aren't
  routes: they're separate apps that open in a new window.

## Themes

- Everything theme-related lives in `@somedaytundra/theme`: the color tokens for both themes
  (`theme.css`, imported by `src/index.css`), `ThemeProvider`/`useTheme`, `ThemeToggle`, the
  backdrops, `IglooMark` and `Wordmark`, and the Clerk colors. Its README has the details. What
  stays here is the dashboard's own UI, including the theme cards in Settings › Appearance.
- Pages use the theme's Tailwind names (`bg-surface`, `text-ink`, `text-muted` and so on), never a
  theme's raw colors.
- The theme and motion setting persist in localStorage under `st.theme` and `st.motion`. The
  `somedaytundraTheme()` plugin in `vite.config.ts` applies them before first paint, so a reload
  doesn't flash the wrong theme.
- `vite.config.ts` dedupes React and Clerk, because the local theme checkout has its own dev
  copies of both.

## Clerk

- The sidebar's top card shows the ST logo with "(click to sign in)", which opens Clerk's sign-in
  modal. Signed in, it shows Clerk's `UserButton` (avatar and account menu) with the user's name.
  The `user_…` id is shown only in dev builds.
- Settings › Account has Manage account (Clerk's profile modal), Sign out, Sign in and Create
  account.
- Clerk's screens are themed to match the current theme (`ClerkThemedProvider.tsx`, using the
  package's `clerkAppearance()`).
- Theme and motion choices are saved to the signed-in user's Clerk `unsafeMetadata.preferences`
  by the package's `ThemePreferenceSync`, so they follow the user to other browsers. Those values
  win on sign-in.
- The Blog is family-only: it's shown to members of the Clerk organization whose slug is
  `VITE_FAMILY_ORG_SLUG` (default `family`), via `useFamilyAccess()` in `src/lib/family.ts`.
  Everyone else gets no Blog nav link, no Blog items on Home, and a "for family" page at `/blog`.
  That's display only: when real posts exist, the server that sends them must check the same
  membership from the Clerk session token.
