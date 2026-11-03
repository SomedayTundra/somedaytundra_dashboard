// Clerk's publishable key is meant for the browser; the secret key never belongs in this app.
// Without a key the dashboard still runs, signed out, and the sign-in card says Clerk isn't set up.
export const CLERK_PUBLISHABLE_KEY: string | undefined = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || undefined

export const CLERK_ENABLED = CLERK_PUBLISHABLE_KEY !== undefined
