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

- Colors are CSS custom properties set per `<html data-theme="…">` in `src/index.css`, exposed to
  Tailwind as `bg-surface`, `text-ink`, `text-muted` and so on. Components never hard-code a
  theme's colors, so adding a theme means a new token block plus an entry in
  `src/theme/themes.ts`.
- `ThemeProvider` keeps the theme and the background-motion setting (always / follow the OS
  reduce-motion setting / off) in localStorage under `st.theme` and `st.motion`. `index.html`
  reads the same keys before first paint, so a reload doesn't flash the wrong theme.
- You can switch themes from the toggle on Home or from Settings › Appearance.
- The backdrops (`src/components/backdrop/`) are generated deterministically. Both themes share
  one tree line (`treeline.ts`). Glacier Forest redraws every other tree in front of the near
  snow, so flakes fall in front of some trees and behind others.

## Clerk

- The sidebar's top card shows the ST logo with "(click to sign in)", which opens Clerk's sign-in
  modal. Signed in, it shows Clerk's `UserButton` (avatar and account menu) with the user's name
  and id.
- Settings › Account has Manage account (Clerk's profile modal), Sign out, Sign in and Create
  account.
- Clerk's screens are themed to match the current theme (`ClerkThemedProvider.tsx`).
- Theme and motion choices are saved to the signed-in user's Clerk `unsafeMetadata.preferences`,
  so they follow the user to other browsers. Those values win on sign-in.
- The Blog is family-only: it's shown to members of the Clerk organization whose slug is
  `VITE_FAMILY_ORG_SLUG` (default `family`), via `useFamilyAccess()` in `src/lib/family.ts`.
  Everyone else gets no Blog nav link, no Blog items on Home, and a "for family" page at `/blog`.
  That's display only: when real posts exist, the server that sends them must check the same
  membership from the Clerk session token.
