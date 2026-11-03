import * as React from 'react'
import { ClerkProvider, useUser } from '@clerk/react'
import { CLERK_PUBLISHABLE_KEY } from '@/lib/clerk.ts'
import { useTheme } from '@/theme/themeContext.ts'
import { isMotionId, isThemeId, type ThemeId } from '@/theme/themes.ts'

// Clerk's own screens (sign-in modal, UserButton menu, account page) drawn in the current theme.
const CLERK_VARIABLES: Record<ThemeId, Record<string, string>> = {
    'glacier-forest': {
        colorPrimary: '#1F6BC0',
        colorPrimaryForeground: '#FFFFFF',
        colorBackground: '#FFFFFF',
        colorForeground: '#0E2238',
        colorMutedForeground: '#4A607A',
        colorInput: '#FFFFFF',
        colorInputForeground: '#0E2238',
        colorNeutral: '#35506D',
        colorBorder: '#D3E2F0',
    },
    aurora: {
        colorPrimary: '#5BE7A9',
        colorPrimaryForeground: '#03140C',
        colorBackground: '#0C1118',
        colorForeground: '#E7EEF4',
        colorMutedForeground: '#93A5B8',
        colorInput: '#101823',
        colorInputForeground: '#E7EEF4',
        colorNeutral: '#C4D0DC',
        colorBorder: '#1C2733',
    },
}

type StoredPreferences = { theme?: unknown; motion?: unknown }

/**
 * Keeps the theme and motion settings in the signed-in user's Clerk `unsafeMetadata`, so they follow
 * the user to other browsers. On sign-in the stored values win; after that, local changes are saved.
 * (`unsafeMetadata` is user-writable from the browser, which is fine for display preferences.)
 */
function PreferenceSync() {
    const { user } = useUser()
    const { theme, setTheme, motion, setMotion } = useTheme()
    // which user's stored preferences have been applied; saving waits for this so a fresh sign-in
    // doesn't overwrite their stored theme with whatever this browser had
    const [syncedUserId, setSyncedUserId] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!user || syncedUserId === user.id) return
        const stored = user.unsafeMetadata.preferences as StoredPreferences | undefined
        if (isThemeId(stored?.theme)) setTheme(stored.theme)
        if (isMotionId(stored?.motion)) setMotion(stored.motion)
        setSyncedUserId(user.id)
    }, [user, syncedUserId, setTheme, setMotion])

    React.useEffect(() => {
        if (!user || syncedUserId !== user.id) return
        const stored = user.unsafeMetadata.preferences as StoredPreferences | undefined
        if (stored?.theme === theme && stored?.motion === motion) return
        user.update({ unsafeMetadata: { ...user.unsafeMetadata, preferences: { theme, motion } } }).catch(() => {
            // not being able to save a display preference shouldn't interrupt anything
        })
    }, [user, syncedUserId, theme, motion])

    return null
}

export default function ClerkThemedProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    if (CLERK_PUBLISHABLE_KEY === undefined) return children

    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            appearance={{
                variables: { ...CLERK_VARIABLES[theme], fontFamily: 'Manrope, system-ui, sans-serif', borderRadius: '0.75rem' },
            }}
        >
            <PreferenceSync />
            {children}
        </ClerkProvider>
    )
}
