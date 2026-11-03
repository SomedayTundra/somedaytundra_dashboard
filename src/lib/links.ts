// The sibling apps open in a new window for now. Set the VITE_ vars for deployments; an empty or
// missing value falls back to the local dev server (NHL Stats pins 5173, Bulldog Shuttle takes 5174
// when NHL Stats is already running).
export const NHL_STATS_URL: string = import.meta.env.VITE_NHL_STATS_URL || 'http://localhost:5173'

export const BULLDOG_SHUTTLE_URL: string = import.meta.env.VITE_BULLDOG_SHUTTLE_URL || 'http://localhost:5174'
