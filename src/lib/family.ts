import { useUser } from '@clerk/react'
import { CLERK_ENABLED } from './clerk.ts'

// The Clerk organization whose members can see family-only pages (the Blog). Slugs are unique per
// Clerk instance, so once it exists nobody else can create an organization that matches.
export const FAMILY_ORG_SLUG: string = import.meta.env.VITE_FAMILY_ORG_SLUG || 'family'

export type FamilyAccess = 'loading' | 'signed-out' | 'denied' | 'granted'

function useClerkFamilyAccess(): FamilyAccess {
    const { isLoaded, user } = useUser()
    if (!isLoaded) return 'loading'
    if (!user) return 'signed-out'
    return user.organizationMemberships.some((m) => m.organization.slug === FAMILY_ORG_SLUG) ? 'granted' : 'denied'
}

// Without Clerk there's no one to be signed in as, so family pages stay closed.
function useNoFamilyAccess(): FamilyAccess {
    return 'signed-out'
}

/**
 * Whether the current user is in the family organization. This only decides what the dashboard
 * shows: anything genuinely private must also be checked by whatever server sends it.
 */
export const useFamilyAccess = CLERK_ENABLED ? useClerkFamilyAccess : useNoFamilyAccess
