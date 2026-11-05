import type * as React from 'react'
import { ClerkProvider } from '@clerk/react'
import { clerkAppearance, useTheme } from '@somedaytundra/theme'
import { SessionFocusSync, ThemePreferenceSync } from '@somedaytundra/theme/clerk'
import { CLERK_PUBLISHABLE_KEY } from '@/lib/clerk.ts'

// Clerk's screens (sign-in modal, UserButton menu, account page) drawn in the current theme, with
// the theme and motion settings saved to the signed-in user's account, and a sign-in or sign-out
// made in another ST app picked up when this tab comes back into view.
export default function ClerkThemedProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    if (CLERK_PUBLISHABLE_KEY === undefined) return children

    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} appearance={clerkAppearance(theme)}>
            <SessionFocusSync />
            <ThemePreferenceSync />
            {children}
        </ClerkProvider>
    )
}
