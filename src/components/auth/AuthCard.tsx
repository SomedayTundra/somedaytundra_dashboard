import * as React from 'react'
import { ClerkLoading, Show, UserButton, useClerk, useUser } from '@clerk/react'
import { ChevronsUpDown } from 'lucide-react'
import IglooMark from '@/components/brand/IglooMark.tsx'
import Wordmark from '@/components/brand/Wordmark.tsx'
import { CLERK_ENABLED } from '@/lib/clerk.ts'

const cardClass = 'w-full rounded-2xl border border-line bg-surface shadow-card'

function SignedOutCard({ onClick, note, disabled }: { onClick?: () => void; note: string; disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`${cardClass} flex cursor-pointer flex-col items-center gap-2.5 px-3.5 pt-5 pb-4 disabled:cursor-default`}
        >
            <IglooMark width={64} height={51} />
            <Wordmark size="md" />
            <span className="text-[12.5px] font-semibold text-muted">{note}</span>
        </button>
    )
}

// Clerk's UserButton, stretched so the whole row (avatar and name) is its trigger: a click anywhere
// on it opens Clerk's account menu.
const userButtonAppearance = {
    elements: {
        rootBox: { width: '100%' },
        userButtonTrigger: {
            width: '100%',
            justifyContent: 'flex-start',
            padding: '12px 40px 12px 14px',
            borderRadius: 0,
            '&:focus': { boxShadow: 'none' },
            '&:focus-visible': { outline: '2px solid var(--accent)', outlineOffset: '-2px' },
            '&:hover': { background: 'var(--nav-hover)' },
        },
        // Clerk puts the name before the avatar; flip it so the avatar leads
        userButtonBox: { flexDirection: 'row-reverse', gap: '12px', color: 'var(--ink)' },
        userButtonOuterIdentifier: { fontSize: '14px', fontWeight: 700, padding: 0, color: 'var(--ink)' },
        userButtonAvatarBox: { width: '38px', height: '38px' },
    },
}

function SignedInCard() {
    const { user } = useUser()
    if (!user) return null

    return (
        <div className={`${cardClass} overflow-hidden`}>
            <div className="flex items-baseline gap-2.5 border-b border-line-soft px-3.5 py-3">
                <IglooMark width={44} height={21} crop="tight" />
                <Wordmark size="sm" />
            </div>
            <div className="relative">
                <UserButton showName appearance={userButtonAppearance} />
                <ChevronsUpDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
                />
            </div>
            {/* handy while standing Clerk up; dev builds only, never shown in production */}
            {import.meta.env.DEV && (
                <p className="m-0 truncate border-t border-line-soft px-3.5 py-1.5 font-mono text-[11px] text-muted" title={user.id}>
                    dev · {user.id}
                </p>
            )}
        </div>
    )
}

function ClerkAuthCard() {
    const clerk = useClerk()
    return (
        <>
            <ClerkLoading>
                <SignedOutCard note="Loading…" disabled />
            </ClerkLoading>
            <Show when="signed-out">
                <SignedOutCard note="(click to sign in)" onClick={() => clerk.openSignIn()} />
            </Show>
            <Show when="signed-in">
                <SignedInCard />
            </Show>
        </>
    )
}

function UnconfiguredAuthCard() {
    const [explained, setExplained] = React.useState(false)
    return (
        <div className="flex flex-col gap-2">
            <SignedOutCard note="(click to sign in)" onClick={() => setExplained(true)} />
            {explained && (
                <p role="status" className="px-1 text-[12.5px] leading-snug text-muted">
                    Sign-in isn't set up yet: add <code className="font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> to{' '}
                    <code className="font-mono">.env.local</code>.
                </p>
            )}
        </div>
    )
}

// The card at the very top of the sidebar: the ST logo when signed out, the Clerk user when signed in.
export default function AuthCard() {
    return CLERK_ENABLED ? <ClerkAuthCard /> : <UnconfiguredAuthCard />
}
