/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY?: string
    readonly VITE_NHL_STATS_URL?: string
    readonly VITE_BULLDOG_SHUTTLE_URL?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
